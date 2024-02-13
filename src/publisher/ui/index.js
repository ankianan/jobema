import { publish } from "../controller/controller.js"
import context from "../recruiter/context.js";
import { createDoc } from "../recruiter/createDoc.js"

window.onload = function(){
    document.getElementById('publishForm').addEventListener('submit', async function(){
        const doc = createDoc();
        const result = await publish(doc, context);
        console.log(result);
    });
}