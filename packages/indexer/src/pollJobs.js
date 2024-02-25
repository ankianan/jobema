import { getIndex_lastUpdate } from './connectDB.js';

/**
 *
 * @param {Number} lastUpdatedSince
 * @returns {Promise<import('./model/JobPosting.js').JobPostingId[]>}
 */
export async function pollJobs(lastUpdatedSince) {
    // Create a database
    const index_last_update = getIndex_lastUpdate();

    let result = [];

    // Iterate entries with keys that are created after 'lastUpdatedSince'
    for await (const [key, value] of index_last_update.iterator({ gte: lastUpdatedSince })) {
        result.push(value);
    }

    // @ts-ignore
    return result;
}
