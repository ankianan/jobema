import {Level} from 'level';

/**
 * @type {Level<string, string>}
 */
let db = null;
/**
 * @type {import("abstract-level").AbstractSublevel<Level<string, string>, string | Buffer | Uint8Array, string, string>}
 */
let level_last_update = null;
export function connectDB() {
    if(!db){
        db = new Level('db', { valueEncoding: 'json' });
        level_last_update =  db.sublevel('last_update', {valueEncoding: 'json'});
    }
    return db;
    
}
export function getIndex_lastUpdate() {
    connectDB();
    return level_last_update;
}


