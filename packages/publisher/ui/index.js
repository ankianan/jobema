import { pollMetadata, publish, read } from "../controller/controller.js";
import { createDoc } from "../recruiter/createDoc.js";
import JobPosting from "../recruiter/model/JobPosting.js";
let now = Date.now();
window.onload = function(){
    document.getElementById('publishForm').addEventListener('submit', async function(event){
        if(event.target instanceof JobPostingForm){
            const doc = createDoc(event.target.toJson());
            
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

class JobPostingForm extends HTMLFormElement{
    constructor() {
        super();
    }
   toJson(){
        // @ts-ignore
        return new JobPosting(this.elements["title"].value)
    }
}

window.customElements.define('job-posting-form', JobPostingForm, {
    extends: "form"
})


