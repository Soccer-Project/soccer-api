import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

export function verifyAuthenticated(request: Request, response: Response, next: NextFunction){
    const authToken = request.headers.authorization

    if(authToken){

        const [, token] = authToken.split(" ")

        try{
            const { sub } = verify(token, process.env.TOKEN) as IPayload
            request.userId = sub
            next();
        } catch(error){
            console.log(error)
            return response.status(401)
        }
    }

    return response.status(401)
}
