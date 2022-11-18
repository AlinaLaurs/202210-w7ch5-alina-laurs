import mongoose from 'mongoose';
import { USER1, CLUSTER, PASSW } from './config.js';

export function dbConnect() {
    const DBName = process.env.NODE_ENV !== 'test' ? 'tapas' : 'TapasTesting';
    let uri = `mongodb+srv://${USER1}:${PASSW}`;
    uri += `@${CLUSTER}/${DBName}?retryWrites=true&w=majority`;
    return mongoose.connect(uri);
}
