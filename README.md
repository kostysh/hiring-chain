# hiring-chain
A simple hiring Dapp on the Arweave blockchain

> This demo application is made according to [Open Web Hackathon: Build A Simple Permaweb App](https://gitcoin.co/issue/ArweaveTeam/Bounties/1/3184)  

- You can look thru published jobs on the Home screen, search by them, view details
- You should be looged in into Dapp to make postings  
- You can publish your own resumes and jobs
- You can remove your own published jobs and CVs
- You can make an application on the published job (job owner will see your application in jobs list)

Application is constantly available on the link: [https://arweave.net/A5Y3DSzVgkFAHlx2lnPWRr_yzqKNr5JvzXICwmumFEY](https://arweave.net/A5Y3DSzVgkFAHlx2lnPWRr_yzqKNr5JvzXICwmumFEY)

## Initialisation
```sh
npm i
```

## Start app locally

Then app started it should be available via web browser by address http://localhost:3000

```sh
npm start
```

## App deployment

Be sure your wallet keyfile is placed in the root (ignored on GitHub).  
This file should be named: `arweave-keyfile.json`.  
If you don't have a wallet, please get one [here](https://tokens.arweave.org/).

```sh
npm run savekey
npm run deploy
```
