import { createHelia } from 'helia';
import { json } from '@helia/json';
import { createLibP2PNode } from './createLibp2pNode.js';
import { CID } from 'multiformats/cid'

/**
 * @type {import("helia").HeliaLibp2p<import("libp2p").Libp2p<{ x: Record<string, unknown>; }>>}
 */
let helia;
/**
 * @type {import("@helia/json").JSON}
 */
let j;

/**
 * @param {unknown} jsonData
 */
export async function publishJson(jsonData) {
    await initHelia();
    const myImmutableAddress = await j.add(jsonData);
    const cid = myImmutableAddress.toString();
    return cid;
}


export async function getJson(cid = '') {
    await initHelia();    
    const parsedCid = CID.parse(cid);
    let data = await j.get(parsedCid);
    return data;
}

async function initHelia() {
    if (!helia) {
        helia = await createHelia({
            libp2p: await createLibP2PNode()
        });
        j = json(helia)   
    }
}
