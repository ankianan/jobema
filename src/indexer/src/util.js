import { indexJobPostingUpdate } from './indexing.js';
import  { connectDB, getIndex_lastUpdate } from './connectDB.js';
import { JobPosting } from "./model/JobPosting.js";

/**
 * 
 * @param {JobPosting} data 
 * @returns 
 */
export async function addJobPosting(data) {
    // Create a database
    const db = connectDB();

    // Add an entry with key 'a' and value 1
    const jobPosting = data;
    await db.put(jobPosting.id, jobPosting);
    await indexJobPostingUpdate(jobPosting);

    return jobPosting.id;
}

export async function updateJobPosting(updatedData) {
    // Create a database
    const db = connectDB();

    // Add an entry with key 'a' and value 1
    const jobPosting = JobPosting.create(updatedData);
    jobPosting.update();
    await db.put(jobPosting.id, jobPosting);
    await indexJobPostingUpdate(jobPosting);
}

/**
 * 
 * @param {Number} lastUpdatedSince 
 * @returns {JobPosting[]}
 */
export async function pollJobs(lastUpdatedSince) {
    // Create a database
    const index_last_update = getIndex_lastUpdate();

    let result = [];

    // Iterate entries with keys that are created after 'lastUpdatedSince'
    for await (const [key, value] of index_last_update.iterator({ gte: lastUpdatedSince })) {
        result.push(value);
    }
    
    return result;
}

