import context from "./context.js";
import JobPosting from "./model/JobPosting.js";
/**
 * @param {JobPosting} jobPosting
 */
export function createDoc(jobPosting) {
  return {
    ...context,
    ...jobPosting
  };
}
