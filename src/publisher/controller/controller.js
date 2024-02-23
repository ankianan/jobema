import jsonld from 'jsonld';
import { addJobPosting } from '../../indexer/src/util.js';
import { publishJson } from './ipfs.js';
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
    await addJobPosting(JobPosting.create({
        ipfs_cid
    }))
    return expanded;
}


