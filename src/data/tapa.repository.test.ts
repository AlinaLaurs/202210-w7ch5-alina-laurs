import mongoose from 'mongoose';
import { dbConnect } from '../db.conect';
import { TapaRepository } from './tapas.repository';

const mockData = [
    {
        name: 'Ensaladilla rusa',
        origin: 'Spanish',
        ingredient: 'Potato',
        tasted: true,
    },
    {
        name: 'Morcilla',
        origin: 'Spanish',
        ingredient: 'Rice',
        tasted: true,
    },
];

describe('Given TapaRespository', () => {
    describe('When we instantiate it', () => {
        const repository = new TapaRepository();
        let testIds: Array<string>;

        beforeAll(async () => {
            await dbConnect();
            await repository.getModel().deleteMany();
            await repository.getModel().insertMany(mockData);
            const data = await repository.getModel().find();
            testIds = [data[0].id, data[1].id];
        });
        afterAll(() => {
            mongoose.disconnect();
        });

        test('Then getAll should have been called', async () => {
            const result = await repository.getAll();
            expect(result[0].name).toEqual(mockData[0].name);
        });
        test.skip('Then get should have been called', async () => {
            const result = await repository.get(1);
            expect(result.name).toEqual('Chorizo');
        });

        test('Then post should have been called', async () => {
            const newTapa = {
                name: 'Tortilla de patata',
                origin: 'Spanish',
                ingredient: 'Potato',
                tasted: false,
            };
            const result = await repository.post(newTapa);
            expect(result.name).toEqual(newTapa.name);
        });

        test.skip('Then patch should have been called', async () => {
            const result = await repository.patch(4, mockData[0]);
            expect(result).toEqual(mockData);
        });

        test.skip('Then delete should have been called', async () => {
            const result = await repository.delete(2);
            expect(result).toEqual([]);
        });

        test('Then if id is bad formated delete should throw an error', async () => {
            expect(async () => {
                await repository.delete(2);
            }).rejects.toThrowError(mongoose.Error.CastError);
        });
    });
});
