import { Router } from 'express';
import { TapaController } from '../controllers/tapas.js';
import { TapaRepository } from '../data/tapas.repository.js';

export const tapaRouter = Router();

const controller = new TapaController(new TapaRepository());

tapaRouter.get('/', controller.getAll.bind(controller));
tapaRouter.get('/:id', controller.get.bind(controller));
tapaRouter.post('/', controller.post.bind(controller));
tapaRouter.patch('/:id', controller.patch.bind(controller));
tapaRouter.delete('/:id', controller.delete.bind(controller));
