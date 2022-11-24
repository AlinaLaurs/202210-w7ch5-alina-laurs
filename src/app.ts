import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { robotsRouter } from './router/robots.js';
import { usersRouter } from './router/users.js';
import { errorManager } from './middlewares/errors.js';
import { setCors } from './middlewares/cors.js';

export const app = express();
app.disable('x-powered-by');

const corsOptions = {
    origin: '*',
};

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());

app.use(setCors);

app.get('/', (_req, res) => {
    res.send('API de robots. Escribe «/robots» para ver la API.').end();
});

app.use('/robots', robotsRouter);
app.use('/users', usersRouter);

app.use(errorManager);
