import { NextFunction, Request, Response } from 'express';
import { RobotsRepository } from '../data/robots.repository';
import { RobotsController } from './robots';

jest.mock('../data/robots.repository');

describe('Given RobotController', () => {
    RobotsRepository.prototype.getAll = jest.fn().mockResolvedValue(['mock']);
    RobotsRepository.prototype.get = jest.fn().mockResolvedValue(['mock']);
    RobotsRepository.prototype.post = jest.fn().mockResolvedValue(['mock']);
    RobotsRepository.prototype.patch = jest.fn().mockResolvedValue(['mock']);
    RobotsRepository.prototype.delete = jest.fn().mockResolvedValue(['mock']);
    const repository = new RobotsRepository();

    const robotsController = new RobotsController(repository);
    const req: Partial<Request> = {};
    const resp: Partial<Response> = {
        json: jest.fn(),
    };
    const next: NextFunction = jest.fn();

    test('Then getAll should have been called', async () => {
        await robotsController.getAll(req as Request, resp as Response, next);
        expect(resp.json).toHaveBeenCalledWith({ robots: ['mock'] });
    });

    test('Then get should have been called', async () => {
        await robotsController.get(req as Request, resp as Response, next);
        expect(resp.json).toHaveBeenCalledWith({ robots: ['mock'] });
    });

    test('Then post should have been called', async () => {
        await robotsController.post(req as Request, resp as Response, next);
        expect(resp.json).toHaveBeenCalledWith({ robots: ['mock'] });
    });

    test('Then patch should have been called', async () => {
        await robotsController.patch(req as Request, resp as Response, next);
        expect(resp.json).toHaveBeenCalledWith({ robots: ['mock'] });
    });

    test('Then delete should have been called', async () => {
        await robotsController.delete(req as Request, resp as Response, next);
        expect(resp.json).toHaveBeenCalledWith({ robots: ['mock'] });
    });
});
