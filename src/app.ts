import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { CustomError } from './interfaces/error.js';
import { robotsRouter } from './router/robots.js';

export const app = express();
app.disable('x-powered-by');

const corsOptions = {
    origin: '*',
};

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
    const origin = req.header('Origin') || '*';
    res.setHeader('Access-Control-Allow-Origin', origin);
    next();
});

app.get('/', (_req, res) => {
    res.send('API de robots. Escribe «/robots» para ver la API.').end();
});

app.use('/robots', robotsRouter);

app.use(
    (error: CustomError, _req: Request, resp: Response, next: NextFunction) => {
        let status = error.statusCode || 500;
        if (error.name === 'ValidationError') {
            status = 406;
        }
        const result = {
            status: status,
            type: error.name,
            error: error.message,
        };
        resp.status(status).json(result).end();
    }
);
