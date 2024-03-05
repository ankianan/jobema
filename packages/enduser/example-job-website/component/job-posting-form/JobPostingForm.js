export class JobPostingForm extends HTMLFormElement {
    constructor() {
        super();
    }
    toJson() {
        // @ts-ignore
        return {
            title: this.elements["title"].value
        };
    }
}
window.customElements.define('job-posting-form', JobPostingForm, {
    extends: "form"
});

