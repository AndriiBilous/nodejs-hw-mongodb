import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
    const app = express();

    app.use('/api-docs', swaggerDocs());

    app.use(express.json());

    app.use(cors());
    app.use(cookieParser());
    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );
    app.use(router);
    app.use(errorHandler);
    app.use('*', notFoundHandler);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    app.use('/uploads', express.static(UPLOAD_DIR));
};
