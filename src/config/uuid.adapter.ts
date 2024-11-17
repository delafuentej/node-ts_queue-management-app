import {v4 as uuidv4} from 'uuid';

export class UuidAdapter {
    static uuid(){
        return uuidv4();
    }
};