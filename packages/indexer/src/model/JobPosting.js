let idCounter = 1234;


/**
 * @typedef {(string)} JobPostingId
 */

/**
 * @typedef {{
 *  ipfs_cid: any;
 *  id?: JobPostingId;
 *  created?: any;
 *  updated?: any;
 *  status?: number
 * }} JobPostingJson
 */

export class JobPosting {
    #_id = 0
    status = JOB_STATUS.ACTIVE;
    created = Date.now();
    _updated = Date.now();
    /**
     * @param {JobPostingJson} jobPosting
     */
    constructor(jobPosting){
        if(jobPosting.id){
            // @ts-ignore
            this.#apply(jobPosting);
        }else{
            this.#init(jobPosting);
        }
        
    }
    /**
     * @param {JobPostingJson} jobPosting
     */
    #apply(jobPosting) {
        this.ipfs_cid = jobPosting.ipfs_cid;
        this.created = jobPosting.created;
        this._id = jobPosting.id;
        this._updated = jobPosting.updated;
        this.status = jobPosting.status
    }

    /**
     * @param {JobPostingJson} jobPosting
     */
    #init(jobPosting) {
        this.ipfs_cid = jobPosting.ipfs_cid;
        this._id = idCounter++;
        this.created = Date.now();
        this._updated = Date.now();
    }

    get id(){
        return this._id + '';
    }
    get updated(){
        return this._updated + '';
    }
    update(){
        this._updated = Date.now();
    }
    toJson(){
        return {
            ipfs_cid: this.ipfs_cid,
            id: this.id,
            created: this.created,
            updated: this.updated,
            status: this.status
        }
    }
    /**
     * @param {JobPostingJson} jobPosting
     */
    static create(jobPosting){
        return new JobPosting(jobPosting);
    }
}

const JOB_STATUS = {
    'ACTIVE': 1,
    'INACTIVE': 2
};

