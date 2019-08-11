import { arweave } from './arweave';
import { getTagValue } from './jobs';
import packageJson from '../../package.json';

export const getVersion = async () => {
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
            expr2: {
                op: 'and',
                expr1: {
                    op: 'equals',
                    expr1: 'from',
                    expr2: 'Sg9TiV1zmT3nALIazsquR9QpCh2WVC1O4JG5l-iYqV0'
                },
                expr2: {
                    op: 'equals',
                    expr1: 'Type',
                    expr2: `${packageJson.name}.version`
                }                    
            }
        }
    });

    if (ids.length === 0) {
        return null;
    }

    const transactions = await Promise.all(ids.map(id => arweave.transactions.get(id)));
    const appIds = transactions.map(tx => ({
        id: getTagValue(tx, 'App-Id'),
        time: getTagValue(tx, 'Unix-Time')
    }));

    return appIds.sort((a1, a2) => a1.time - a2.time).splice(-1, 1)[0].id;
};
