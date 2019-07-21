import { arweave } from './arweave';

import packageJson from '../../package.json';

export const postCv = async (cv, wallet) => {
    const transaction = await arweave.createTransaction({
        data: JSON.stringify(cv),
    }, wallet);
    transaction.addTag('App-Name', packageJson.name);
    transaction.addTag('App-Version', packageJson.version);
    transaction.addTag('Unix-Time', Math.round((new Date()).getTime() / 1000));
    transaction.addTag('Type', 'hiringchain.cv');
    transaction.addTag('IPFS-Add', cv.ipfs);

    await arweave.transactions.sign(transaction, wallet);
    const response = await arweave.transactions.post(transaction);

    if (response.status === 400 || response.status === 500) {
        throw new Error('Transaction failed');
    }

    return transaction;
};

export const closeCvById = async (id, wallet) => {
    const transaction = await arweave.createTransaction({
        data: id,
    }, wallet);
    transaction.addTag('App-Name', packageJson.name);
    transaction.addTag('App-Version', packageJson.version);
    transaction.addTag('Unix-Time', Math.round((new Date()).getTime() / 1000));
    transaction.addTag('Type', 'hiringchain.cv.close');
    transaction.addTag('Cv', id);

    await arweave.transactions.sign(transaction, wallet);
    const response = await arweave.transactions.post(transaction);

    if (response.status === 400 || response.status === 500) {
        throw new Error('Transaction failed');
    }

    return transaction;
};

export const fetchCvsIds = async (address = null) => {

    let typeExpr = {
        op: 'and',
        expr1: {
            op: 'equals',
            expr1: 'from',
            expr2: address// Get ids from specific owner by default
        },
        expr2: {
            op: 'equals',
            expr1: 'Type',
            expr2: 'hiringchain.cv'
        }                    
    };

    if (!address) {
        typeExpr = {
            op: 'equals',
            expr1: 'Type',
            expr2: 'hiringchain.cv'                   
        };
    }

    return await arweave.arql({
        op: 'and',
        expr1: {
            op: 'equals',
            expr1: 'App-Name',
            expr2: packageJson.name
        },
        expr2: {
            op: 'and',
            expr1: {
                op: 'equals',
                expr1: 'App-Version',
                expr2: packageJson.version
            },
            expr2: typeExpr
        }
    });
};

export const fetchClosedCvsIds = async (address = null) => {
    let typeExpr = {
        op: 'and',
        expr1: {
            op: 'equals',
            expr1: 'from',
            expr2: address// Get ids from specific owner by default
        },
        expr2: {
            op: 'equals',
            expr1: 'Type',
            expr2: 'hiringchain.cv.close'
        }                    
    };

    if (!address) {
        typeExpr = {
            op: 'equals',
            expr1: 'Type',
            expr2: 'hiringchain.cv.close'                   
        };
    }

    const ids = await arweave.arql({
        op: 'and',
        expr1: {
            op: 'equals',
            expr1: 'App-Name',
            expr2: packageJson.name
        },
        expr2: {
            op: 'and',
            expr1: {
                op: 'equals',
                expr1: 'App-Version',
                expr2: packageJson.version
            },
            expr2: typeExpr
        }
    });
    
    const transactions = await Promise.all(ids.map(id => arweave.transactions.get(id)));

    return transactions.map(tx => getTagValue(tx, 'Cv'));
};

export const isTransactionMined = async (id) => {
    const { status, confirmed } = await arweave.transactions.getStatus(id);

    if (status === 400 || status === 500) {
        throw new Error('Transaction failed');
    }

    return confirmed && confirmed.number_of_confirmations >= 1;
};

export const getTagValue = (transaction, name) => {
    const tags = transaction.get('tags');
    const tag = tags.filter(t => t.get('name', {
        decode: true,
        string: true
    }) === name);

    return tag[0].get('value', {
        decode: true,
        string: true
    })
};

export const convertIdsToStore = async (ids, address, notMined = false) => {
    const transactions = await Promise.all(ids.map(id => {

        // It is possible to pass already fetched transaction
        if (typeof id === 'object' && id.id) {
            return id;
        }

        return arweave.transactions.get(id);
    }));
    const dataset = transactions.map(tx => ([
        tx.get('id'),
        {
            id: tx.get('id'),
            time: Number(getTagValue(tx, 'Unix-Time')),
            mined: !notMined,
            closed: false,
            cv: JSON.parse(tx.get('data', {
                decode: true, 
                string: true
            })),
            transaction: tx
        }
    ]));
    let hashedObj = Object.fromEntries(dataset);

    if (notMined) {
        return hashedObj;
    }

    // get extensions
    const closedIds = await fetchClosedCvsIds(address);

    if (closedIds.length > 0) {
        hashedObj = Object.fromEntries(Object.entries(hashedObj).filter(v => !closedIds.includes(v[0])));
    }

    return hashedObj;
};

export const getCvById = async (id) => {
    const transaction = await arweave.transactions.get(id);
    const closedIds = await arweave.arql({
        op: 'and',
        expr1: {
            op: 'equals',
            expr1: 'App-Name',
            expr2: packageJson.name
        },
        expr2: {
            op: 'and',
            expr1: {
                op: 'equals',
                expr1: 'App-Version',
                expr2: packageJson.version
            },
            expr2: {
                op: 'and',
                expr1: {
                    op: 'equals',
                    expr1: 'Cv',
                    expr2: transaction.get('id')
                },
                expr2: {
                    op: 'equals',
                    expr1: 'Type',
                    expr2: 'hiringchain.cv.close'
                }                    
            }
        }
    });

    return {
        id: transaction.get('id'),
        time: Number(getTagValue(transaction, 'Unix-Time')),
        closed: closedIds && closedIds.length === 1,
        ...JSON.parse(transaction.get('data', {
            decode: true, 
            string: true
        }))
    }
};