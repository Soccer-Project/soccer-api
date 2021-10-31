import 'reflect-metadata';
import express from 'express';
import { router } from './utils/routes';
import createConnection from'./database';

createConnection();
const app = express();

app.use(express.json());
app.use(router)

export { app }
