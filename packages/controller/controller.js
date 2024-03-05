import jsonld from 'jsonld';
/**
 * @param {jsonld.JsonLdDocument} compacted
 */
export async function publish(compacted) {
    await validateSchema(compacted);
    const expanded = await jsonld.expand(compacted);
    
    
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
 * @param {jsonld.JsonLdDocument} compacted
 * @throws 'Missing Schema Type'
 */
async function validateSchema(compacted) {
    if (!('@type' in compacted)) {
        throw new Error('Missing Schema Type');
    }
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

/**
 * @param {number} since
 */
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
/**
 * This allows any type of posting to be published in a standard format
 * @param {any} posting
 * @param {any} context,
 * @param {import('./constants.js').PostingTypes} type
 */
export function createDoc(posting, context, type) {
  return {
    "@type": type,
    ...context,
    ...posting
  };
}

