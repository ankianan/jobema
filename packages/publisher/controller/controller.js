import jsonld from 'jsonld';
import { addJobPosting } from '../../indexer/src/util.js';
import { JobPosting } from '../../indexer/src/model/JobPosting.js';
/**
 * @param {jsonld.JsonLdDocument} compacted
 */
export async function publish(compacted) {
    const expanded = await jsonld.expand(compacted);
    // Validate schema
    // Publish to IPFS
    const ipfs_cid = await publishJson(expanded);
    
    console.debug("[Controller]", "ipfs_cid:", ipfs_cid)
    // Request Indexing
    await indexJobPosting({
        ipfs_cid
    })
    return ipfs_cid;
}

/**
 * 
 * @param {{ipfs_cid: string}} jobPosting 
 * @returns 
 */
export async function read(jobPosting) {
  return fetch(`http://localhost:3000/${jobPosting.ipfs_cid}`)
    .then((response) => response.json());
}

export async function pollMetadata(since) {
    return fetch(`http://localhost:3001/poll/${since}`)
      .then((response) => response.json());
  }


/**
 * @param {import('jsonld/jsonld-spec.js').JsonLdArray} expandedJson
 */
async function publishJson(expandedJson) {
    const myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");

    const ipfs_cid = await fetch("http://localhost:3000/", {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(expandedJson)
    }).then((response) => response.text());
    return ipfs_cid;
}

/**
 * @param {{ ipfs_cid: string; }} metadata
 */
async function indexJobPosting(metadata) {
    const myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");

    const id = await fetch("http://localhost:3001/", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(metadata)
    }).then((response) => response.text());
    return id;
}

