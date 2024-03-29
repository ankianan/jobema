import { addJobPosting, updateJobPosting } from "../util.js"
import { getValueFromDB } from "../getValueFromDB.js";
import {pollJobs} from "../pollJobs.js";

describe('Testing indexing', function() {
    let now = Date.now();
    test('Should index newly added data', async function() {
        const id = await addJobPosting({
            ipfs_cid: 'http://ipfs.org/1234'
        });
    
        
        const [indexedKey] = await pollJobs(now);
        
        let item = await getValueFromDB(indexedKey);
        expect(item.ipfs_cid).toBe('http://ipfs.org/1234');
    });

    test('Should allow update indexed data', async function(){
        const [lastIndexedKey] = await pollJobs(now);
        let lastItem = await getValueFromDB(lastIndexedKey);
        
        let updatedData = Object.assign({}, lastItem, {
            ipfs_cid: 'http://ipfs.org/abcd'
        });
        now = Date.now();
        await updateJobPosting(updatedData)
        
        const [indexedKey] = await pollJobs(now);
        
        expect(indexedKey).toEqual(lastItem.id);
        let item = await getValueFromDB(indexedKey);
        expect(item.created).toEqual(lastItem.created);
        expect(parseInt(item.updated)).toBeGreaterThan(parseInt(lastItem.updated));
        expect(item.ipfs_cid).toBe('http://ipfs.org/abcd');
    })

    test('Should allow updating indexed data more than once', async function(){
        const [lastIndexedKey] = await pollJobs(now);
        
        let lastItem = await getValueFromDB(lastIndexedKey);
        
        let updatedData = Object.assign({}, lastItem, {
            ipfs_cid: 'http://ipfs.org/pqrst'
        });
        now = Date.now();
        await updateJobPosting(updatedData)
        
        const [indexedKey] = await pollJobs(now);
        let item = await getValueFromDB(indexedKey);
        expect(item.id).toEqual(indexedKey);
        expect(item.created).toEqual(lastItem.created);
        expect(parseInt(item.updated)).toBeGreaterThan(parseInt(lastItem.updated));
        expect(item.ipfs_cid).toBe('http://ipfs.org/pqrst');
        
    })
})

