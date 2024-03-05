import { POSTING_TYPES } from "../../../controller/constants.js";
import { pollMetadata, publish, read } from "../../../controller/controller.js";
import { createDoc } from "../../../controller/controller.js";
import context from "../component/job-posting-form/context.js";
import { JobPostingForm } from "../component/job-posting-form/JobPostingForm.js";

let now = Date.now();
window.onload = function(){
    document.getElementById('publishForm').addEventListener('submit', async function(event){
        if(event.target instanceof JobPostingForm){
            const posting = event.target.toJson();
            const doc = createDoc(posting, context, POSTING_TYPES.JobPosting);
            
            await publish(doc);
            // @ts-ignore
            pollMetadata(now).then(data=>{
                data.forEach(async ({ipfs_cid})=>{
                    console.debug("from IPFS", ipfs_cid,  await read({ipfs_cid}));
                })
            });
        }
    });
}


