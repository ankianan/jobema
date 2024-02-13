import { getIndex_lastUpdate } from "./connectDB.js";
import { JobPosting } from "./model/JobPosting.js";

/**
 * 
 * @param {JobPosting} jobPosting 
 */
export async function indexJobPostingUpdate(jobPosting) {
    const index = getIndex_lastUpdate();
    await index.put(jobPosting.updated, jobPosting.id);
}

