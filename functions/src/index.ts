import * as functions from 'firebase-functions';
import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';

const server = express();

(async () => {
    await admin.initializeApp(functions.config().firebase);
    
    await server.use(express.json());
    await server.use(express.urlencoded({extended: true}));
    await server.use(cors());

    await server.use('/api/v0/auth', require('./controllers').authRouter);
    await server.use('/api/v0/categ', require('./controllers').categoriaRouter);
    await server.use('/api/v0/contract', require('./controllers').contractRouter);
    await server.use('/api/v0/creator', require('./controllers').creadorRouter);
    await server.use('/api/v0/rate', require('./controllers').rateRouter);
    await server.use('/api/v0/status', require('./controllers').statusRouter);
    await server.use('/api/v0/subcateg', require('./controllers').subcategRouter);
})();

export const app = functions.https.onRequest(server);
