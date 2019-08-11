const Arweave = require('arweave/node');
const { parseArgv, parseParams } = require('./helpers/argv');
const { doubleLine, print, printError } = require('./helpers/print');
const packageJson = require('../package.json');
const config = require('../src/config.json');

const arweave = Arweave.init({
    host: config.arweave.host,
    port: config.arweave.port,
    protocol: config.arweave.protocol
});

const saveVersion = async (params, wallet) => {
    const parsedParams = parseParams(params);
    const transaction = await arweave.createTransaction({
        data: JSON.stringify({
            name: packageJson.name,
            version: packageJson.version,
            id: parsedParams[0]
        }),
    }, wallet);
    transaction.addTag('App-Name', packageJson.name);
    transaction.addTag('App-Version', packageJson.version);
    transaction.addTag('Unix-Time', Math.round((new Date()).getTime() / 1000));
    transaction.addTag('Type', `${packageJson.name}.version`);
    transaction.addTag('App-Id', parsedParams[0]);

    await arweave.transactions.sign(transaction, wallet);
    const response = await arweave.transactions.post(transaction);

    if (response.status === 400 || response.status === 500) {
        throw new Error('Transaction failed');
    }

    doubleLine();
    print(`Transaction "${transaction.id}" has been send`);
    print(`You can check transaction status by this command: npx arweave status ${transaction.id}`);

    return transaction;
};

/**
 * Webb app version setup script
 */
(async () => {

    try {

        const params = parseArgv(process.argv, 2);
        
        // Initialize
        const wallet = require('../arweave-keyfile.json');

        switch (params.action) {
            case 'id':
                await saveVersion(params, wallet);
                break;

            default:
                throw new Error('Action not found');
        }

        doubleLine();
    } catch(error) {
        printError(error.message);
    }    
})();
