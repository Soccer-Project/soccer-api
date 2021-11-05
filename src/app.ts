import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import { router } from './utils/routes/routes';
import createConnection from'./database';

createConnection();
const app = express();

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(router)

export { app }
