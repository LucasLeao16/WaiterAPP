import express from 'express';
import mongoose from 'mongoose';
import http from 'node:http';
import path from 'node:path';
import { Server } from 'socket.io';
import Cors from './middlewares/Cors';
import { router } from './router';

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose
    .connect('mongodb://localhost:27017')
    .then(() => {
        const port = 3001;
        app.use(Cors);
        app.use(
            '/uploads',
            express.static(path.resolve(__dirname, '..', 'uploads'))
        );
        app.use(express.json());
        app.use(router);
        server.listen(port, () => {
            console.log(`Server rodando em http://localhost:${port}`);
        });
    })
    .catch(() => console.log('Erro ao se conectar ao mongodb'));
