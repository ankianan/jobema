import jsonld from 'jsonld';
import { createDoc } from '../recruiter/createDoc.js';
export async function publish(doc, context) {
    const compacted = await jsonld.compact(doc, context);
    const expanded = await jsonld.expand(compacted);
    // Validate schema
    // Publish to IPFS
    // Request Indexing
    return expanded;
}


