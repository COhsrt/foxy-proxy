BHD-Burst-Proxy
======

[![Software License](https://img.shields.io/badge/license-GPL--3.0-brightgreen.svg?style=flat-square)](LICENSE)

## Prerequisites

- nodejs >= 10

## Setup

```bash
git clone https://github.com/felixbrucker/bhd-burst-proxy
cd bhd-burst-proxy
npm i
npm start
```
This will download the proxy, install its dependencies and setup the default config with some example upstream configs.
Edit the created `config.json` file so that your desired upstream(s) are configured. More on the valid config options below.
Make sure you do not break the json format or the file can not be read correctly.

## Running the proxy in production

I personally use pm2 to manage my nodejs based apps. An example ecosystem.config.js has been included. Just `cp ecosystem.config.js.dist ecosystem.config.js`.
Then just use `pm2 start ecosystem.config.js`.
To startup pm2 on boot use `pm2 save` to save the current running config and `pm2 startup` to startup pm2 on boot.

## Updating the proxy

When installed as a git repository just `git pull`.
If the changes have new dependencies required one needs to execute `npm i` again as well before starting the proxy.

## Config options

The config file currently consists of these config options:

- `upstreams`: Array of upstream config objects, see below (**required**)
  - `name`: The name of the upstream, must be unique (**required**)
  - `url`: The upstream url, **required** for everything except hdpool
  - `mode`: `'solo'` or `'pool'` depending on if the upstream is a pool or a solo wallet (**required**)
  - `isBHD`: Set to `true` if the upstream is a bhd solo wallet or bhd pool (**required** for bhd based upstreams)
  - `walletUrl`: Optional url of a wallet to retrieve block winner information
  - `passphrases`: accountId -> passphrase mapping for solo mining (**required** for solo)
  - `passphrase`: Use a singular passphrase for all accountIds (pool emulation)
  - `targetDL`: Deadlines below this value will not be sent to the upstream (**required**)
  - `updateMiningInfoInterval`: Change the default 1msec update interval, value is in ms
  - `accountKey`: Add the supplied account key to miningInfo and nonceSubmission requests (**required** for bhd pools)
  - `type`: Only used for hdpool as of now, set it to `'hdpool'` if the upstream is hdpool.
  - `capacity`: Hard-set the specified capacity (in GB) in submitNonce requests instead of calculating it based on submissions.
  - `accountIdToUrl`: accountId -> upstream url, override the default upstream url based on the accountId
  - `historicalRoundsToKeep`: By default keep 720 rounds of historical stats, overwrite here
- `listenAddr`: a string representation of the address and port the proxy should listen on (**required**)
- `useMultiplePorts`: set this to `true` when using blago as blago doesn't support regular urls but only an address and a port

## Stats

Currently stats are only available via a socket.io endpoint on the `listenAddr` address and port. An embedded web ui might be added in the future.

## License

GNU GPLv3 (see LICENSE)