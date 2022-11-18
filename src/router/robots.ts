import { Router } from 'express';
import { RobotsController } from '../controllers/robots.js';
import { RobotsRepository } from '../data/robots.repository.js';

export const robotsRouter = Router();

const controller = new RobotsController(new RobotsRepository());

robotsRouter.get('/', controller.getAll.bind(controller));
robotsRouter.get('/:id', controller.get.bind(controller));
robotsRouter.post('/', controller.post.bind(controller));
robotsRouter.patch('/:id', controller.patch.bind(controller));
robotsRouter.delete('/:id', controller.delete.bind(controller));
