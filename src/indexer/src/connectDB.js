import {Level} from 'level';

let db = null;
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


