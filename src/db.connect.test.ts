import { dbConnect, dbDisconnect } from './db.connect';
import mongoose from 'mongoose';

describe('Given dbConnect', () => {
    test('When we instantiate it should make a connection', async () => {
        const result = await dbConnect();
        expect(typeof result).toBe(typeof mongoose);
        mongoose.disconnect();
    });
});

describe('Given db.disconnect', () => {
    test('When we instantiate it should return 0', async () => {
        await dbConnect();
        const result = await dbDisconnect();
        expect(result).toBe(0);
    });
});
