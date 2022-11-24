import mongoose from 'mongoose';
import { dbConnect } from '../db.connect';
import { RobotRepository } from './robot.repository';

const mockData = [
    {
        name: 'Bender',
        image: 'url',
        speed: 7,
        strength: 5,
        creationDate: '19.11.2022',
    },
    {
        name: 'Wall-e',
        image: 'url',
        speed: 8,
        strength: 3,
        creationDate: '20.11.2022',
    },
];

describe('Given RobotsRespository', () => {
    describe('When we instantiate it', () => {
        const repository = RobotRepository.getInstance();
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

        test('Then get should have been called', async () => {
            const result = await repository.get(testIds[0]);
            expect(result.name).toEqual(mockData[0].name);
        });

        test('Then get should have been called', async () => {
            expect(async () => {
                await repository.get(testIds[11]);
            }).rejects.toThrowError();
        });

        test('Then post should have been called', async () => {
            const newRobot = {
                name: 'BB-8',
                image: 'url',
                speed: 9,
                strength: 8,
                creationDate: '16.11.2022',
            };
            const result = await repository.post(newRobot);
            expect(result.name).toEqual(newRobot.name);
        });

        test('Then patch should have been called', async () => {
            const result = await repository.patch(testIds[0], {
                name: 'Bender',
            });
            expect(result.name).toEqual(mockData[0].name);
        });

        test('Then patch should have been called', async () => {
            expect(async () => {
                await repository.patch(testIds[11], { name: 'pepe' });
            }).rejects.toThrowError();
        });

        test('Then delete should have been called', async () => {
            const result = await repository.delete(testIds[0]);
            expect(result).toEqual({ id: testIds[0] });
        });

        // Para testear que el id borrado no se puede borrar.
        test('Then delete should have been called', async () => {
            expect(async () => {
                await repository.delete(1);
            }).rejects.toThrowError(Error);
        });

        test('Then if the id is incorrectly formated delete should throw an error', async () => {
            expect(async () => {
                await repository.delete(1);
            }).rejects.toThrowError(mongoose.Error.CastError);
        });
    });
});
