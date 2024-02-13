const defaultJobPosting = {
    'ipfs_cid': ''
};

let idCounter = '1234';

export class JobPosting {
    constructor(jobPosting = defaultJobPosting){
        this.ipfs_cid = jobPosting.ipfs_cid;
        this.id =  jobPosting.id || idCounter++;
        this.status =  jobPosting.status || JOB_STATUS.ACTIVE;
        this.created =  jobPosting.created || Date.now();
        this.updated =  jobPosting.updated || Date.now();
    }
    update(){
        this.updated = Date.now();
    }
    static create(jobPosting = defaultJobPosting){
        return new JobPosting(jobPosting)
    }
}

const JOB_STATUS = {
    'ACTIVE': 1,
    'INACTIVE': 2
};

