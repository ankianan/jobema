import { createHelia } from 'helia';
import { json } from '@helia/json';
import { createLibP2PNode } from '../../ipfs/src/createLibp2pNode.js';

//window.localStorage.setItem('debug', 'libp2p:*')

/**
 * @type {import("helia").HeliaLibp2p<import("libp2p").Libp2p<{ x: Record<string, unknown>; }>>}
 */
let helia,j;
/**
 * @param {unknown} jsonData
 */
export async function publishJson(jsonData) {
    if(!helia){
        helia = await createHelia({
            libp2p: await createLibP2PNode()
        });
    }
    
    j = json(helia);
    const myImmutableAddress = await j.add(jsonData);
    const cid = myImmutableAddress.toString();
    return cid;
}
//process.exit();