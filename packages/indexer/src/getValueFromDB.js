import { connectDB } from "./connectDB.js";

/**
 * @param {string} key
 */
export async function getValueFromDB(key) {
    const db = connectDB();
    let posting = await db.get(key);
    return JSON.parse(posting);
}
