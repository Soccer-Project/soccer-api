import 'reflect-metadata';
import express, { Response, Request, NextFunction } from 'express';
import cors from 'cors';

import { router } from './utils/routes/routes';
import { authenticatedRouter } from './utils/routes/authenticated.routes'
import createConnection from'./database';

createConnection();
const app = express();

app.use(cors());

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if(error instanceof Error){
        return response.status(400).json({
            error: error.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
});

app.use(function(request: Request, response: Response, next: NextFunction) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(router)
app.use(authenticatedRouter)

export { app }
