# jobema
Its a list of jobs community can read, add or edit.

# Why
- Technology has grown up and data shouldn't be a boundry for next famous job website.

# Advantage and Use cases
- Data can be read by anyone but recruiter posting job should not worry about keep the same job updated across job wesites.
- Similarly, new job websites can read job postings from a single publically available index.


#  Architecture
- Recruiter: Client side who publishes job 
- Controller: Is a client side agent and has following responsibilities:
  - Allows triggering read, add or update job posting.
  - Converts job posting to interoperable format https://schema.org/JobPosting
  - Publishes to IPFS storage
  - Request indexing
- IPFS: Is a decentralized storage
- Indexer: Is a indexing service and has following tasks
  - Generates unique `id` for a new Job Posting
  - Maintains a map of job posting `id` and its details:
    - `ipfs cid`
    - `status flag`
    - `created timestamp`
    - `updated timestamp`
  - Allows getting jobs updated since `timestamp`
  - Allows updating above details by `id`
- JobWebsite: Has following tasks
   - Poll Indexer to get updated jobs since `timestamp`
   - Read Job details from IPFS
   - Convert job posting details from interoperable format to custom format

  ![image](https://www.websequencediagrams.com/files/render?link=qHJuPGkVMrgxb8aiuvVtr0WA57dkOxTQT0FPyqVq5sPdQO8ORnZpml42LIJEOZYL)

## Roadmap
- Allow syncing activities among multiple client side agents
- Store job index in decentralized db for HA

# Visualise job
https://tinyurl.com/yv285h3f
![image](https://github.com/ankit90anand/jobema/assets/121392423/a14ba2ff-426e-4fd2-852c-ca1950f2ac96)


