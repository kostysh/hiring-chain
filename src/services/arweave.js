import Arweave from 'arweave/web';

import config from '../config.json'

export const arweave = Arweave.init({
    host: config.arweave.host,
    port: config.arweave.port,
    protocol: config.arweave.protocol
});

export const getAddress = async (wallet) => await arweave.wallets.jwkToAddress(wallet);

export const getBalance = async (address) => await arweave.wallets.getBalance(address);
