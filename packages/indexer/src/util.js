import { indexJobPostingUpdate } from './indexing.js';
import  { connectDB } from './connectDB.js';
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
    const jobPosting = JobPosting.create(data);
    await db.put(jobPosting.id, JSON.stringify(jobPosting.toJson()));
    await indexJobPostingUpdate(jobPosting);

    return jobPosting.id;
}

/**
 * @param {JobPosting} updatedData
 */
export async function updateJobPosting(updatedData) {
    // Create a database
    const db = connectDB();

    // Add an entry with key 'a' and value 1
    const jobPosting = JobPosting.create(updatedData);
    jobPosting.update();
    await db.put(jobPosting.id, JSON.stringify(jobPosting.toJson()));
    await indexJobPostingUpdate(jobPosting);
}


