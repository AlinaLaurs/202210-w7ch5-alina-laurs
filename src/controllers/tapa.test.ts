import { NextFunction, Request, Response } from 'express';
import { TapaRepository } from '../data/tapas.repository';
import { TapaController } from './tapas';

jest.mock('../data/tapas.repository');

describe('Given TapaController', () => {
    TapaRepository.prototype.getAll = jest.fn().mockResolvedValue(['mock']);
    TapaRepository.prototype.get = jest.fn().mockResolvedValue(['mock']);
    TapaRepository.prototype.post = jest.fn().mockResolvedValue(['mock']);
    TapaRepository.prototype.patch = jest.fn().mockResolvedValue(['mock']);
    TapaRepository.prototype.delete = jest.fn().mockResolvedValue(['mock']);
    const repository = new TapaRepository();

    const tapaController = new TapaController(repository);
    const req: Partial<Request> = {};
    const resp: Partial<Response> = {
        json: jest.fn(),
    };
    const next: NextFunction = jest.fn();

    test('Then getAll should have been called', async () => {
        await tapaController.getAll(req as Request, resp as Response, next);
        expect(resp.json).toHaveBeenCalledWith({ tapas: ['mock'] });
    });

    test('Then get should have been called', async () => {
        await tapaController.get(req as Request, resp as Response, next);
        expect(resp.json).toHaveBeenCalledWith({ tapas: ['mock'] });
    });

    test('Then post should have been called', async () => {
        await tapaController.post(req as Request, resp as Response, next);
        expect(resp.json).toHaveBeenCalledWith({ tapas: ['mock'] });
    });

    test('Then patch should have been called', async () => {
        await tapaController.patch(req as Request, resp as Response, next);
        expect(resp.json).toHaveBeenCalledWith({ tapas: ['mock'] });
    });

    test('Then delete should have been called', async () => {
        await tapaController.delete(req as Request, resp as Response, next);
        expect(resp.json).toHaveBeenCalledWith({ tapas: ['mock'] });
    });
});
