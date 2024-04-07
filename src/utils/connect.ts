import { Tendermint34Client, WebsocketClient } from '@cosmjs/tendermint-rpc'

import { SOCKETURL } from "./constants";

export const connect = async (socketUrl: string = SOCKETURL) => {
    return new Promise(async (resolve, reject) => {
        try {
            const websocketClient = new WebsocketClient(socketUrl, (err) => {
                reject(err)
            })

            const client = await Tendermint34Client.create(websocketClient);

            if (!client) {
                reject(new Error('Could not create Tendermint34Client'))
            }

            resolve(client);
        } catch (err) {
            reject(err);
        }
    });
}