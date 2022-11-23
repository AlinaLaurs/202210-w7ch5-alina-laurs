import { Router } from 'express';
import { RobotsController } from '../controllers/robots.js';
import { RobotsRepository } from '../data/robots.repository.js';
import { logged, who } from '../auth/middlewares/interceptors.js';
import { UserRepository } from '../auth/repositories/user.js';

export const robotsRouter = Router();
const controller = new RobotsController(
    new RobotsRepository(),
    UserRepository.getInstance()
);

robotsRouter.get('/', controller.getAll.bind(controller));
robotsRouter.get('/:id', controller.get.bind(controller));
robotsRouter.post('/', logged, controller.post.bind(controller));
robotsRouter.patch('/:id', logged, who, controller.patch.bind(controller));
robotsRouter.delete('/:id', logged, who, controller.delete.bind(controller));
