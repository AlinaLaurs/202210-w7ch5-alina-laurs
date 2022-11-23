import mongoose from 'mongoose';
import { USER1, CLUSTER, PASSW } from './config.js';

export async function dbConnect() {
    const DBName = process.env.NODE_ENV !== 'test' ? 'Robots' : 'RobotsTesting';
    let uri = `mongodb+srv://${USER1}:${PASSW}`;
    uri += `@${CLUSTER}/${DBName}?retryWrites=true&w=majority`;
    return mongoose.connect(uri);
}

export async function dbDisconnect() {
    await mongoose.disconnect();
    return mongoose.connection.readyState;
}
