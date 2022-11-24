/*

import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../auth/user.repository/user.repository';
import { RobotsRepository as RobotRepository } from '../robot.repository/robot.repository';
import { HTTPError } from '../interfaces/error';
import { RobotsController } from './robots';

jest.mock('../data/robots.repository');

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

describe('Given RobotController', () => {
    RobotRepository.prototype.getAll = jest.fn().mockResolvedValue(mockData);
    RobotRepository.prototype.get = jest.fn().mockResolvedValue(mockData[0]);
    RobotRepository.prototype.post = jest.fn().mockResolvedValue('Robot');
    RobotRepository.prototype.patch = jest.fn().mockResolvedValue(mockData[0]);
    RobotRepository.prototype.delete = jest
        .fn()
        .mockResolvedValue({ id: '103' });

    const repository = RobotRepository.getInstance();
    const userRepo = UserRepository.getInstance();

    const robotsController = new RobotsController(repository, userRepo);
    const req: Partial<Request> = {};
    const resp: Partial<Response> = {
        json: jest.fn(),
    };
    const next: NextFunction = jest.fn();

    test('Then getAll should have been called', async () => {
        await robotsController.getAll(req as Request, resp as Response, next);
        expect(resp.json).toHaveBeenCalledWith({ robots: mockData });
    });

    test('Then get should have been called', async () => {
        req.params = { id: '103' };
        await robotsController.get(req as Request, resp as Response, next);
        expect(resp.json).toHaveBeenCalledWith({ robot: mockData[0] });
    });

    test('Then post should have been called', async () => {
        await robotsController.post(req as Request, resp as Response, next);
        expect(resp.json).toHaveBeenCalledWith({ robot: 'Robot' });
    });

    test('Then patch should have been called', async () => {
        await robotsController.patch(req as Request, resp as Response, next);
        expect(resp.json).toHaveBeenCalledWith({ robot: 'Robot' });
    });

    test('Then delete should have been called', async () => {
        await robotsController.delete(req as Request, resp as Response, next);
        expect(resp.json).toHaveBeenCalledWith({ id: '103' });
    });
});

describe('Given RobotController, some error happened', () => {
    let error: HTTPError;
    beforeEach(() => {
        error = new HTTPError(404, 'Not found id', 'message of error');
    });

    RobotRepository.prototype.getAll = jest.fn().mockRejectedValue(['Robot']);
    RobotRepository.prototype.get = jest.fn().mockRejectedValue(['Robot']);
    RobotRepository.prototype.post = jest.fn().mockRejectedValue(['Robot']);
    RobotRepository.prototype.patch = jest.fn().mockRejectedValue(['Robot']);
    RobotRepository.prototype.delete = jest.fn().mockRejectedValue(['Robot']);

    const repository = new RobotRepository();
    const robotsController = new RobotsController(repository);
    const req: Partial<Request> = {};
    const resp: Partial<Response> = {
        json: jest.fn(),
    };
    const next: NextFunction = jest.fn();

    test('It should throw an error', async () => {
        await robotsController.getAll(req as Request, resp as Response, next);
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(HTTPError);
    });

    test('It should throw an error', async () => {
        await robotsController.get(req as Request, resp as Response, next);
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(HTTPError);
    });

    test('It should throw an error', async () => {
        await robotsController.post(req as Request, resp as Response, next);
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(HTTPError);
    });

    test('It should throw an error', async () => {
        await robotsController.patch(req as Request, resp as Response, next);
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(HTTPError);
    });

    test('It should throw an error', async () => {
        await robotsController.delete(req as Request, resp as Response, next);
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(HTTPError);
    });

    test('It should throw an error', async () => {
        await robotsController.delete(req as Request, resp as Response, next);
        expect(error).toBeInstanceOf(HTTPError);
    });

    test('It should throw an error', async () => {
        await robotsController.delete(req as Request, resp as Response, next);
        expect(error).toBeInstanceOf(HTTPError);
    });
});

*/
