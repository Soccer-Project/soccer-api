import { Request, Response, NextFunction } from 'express';

export function verifyAdmin(request: Request, response: Response, next: NextFunction){

    const admin = request.userId

    if(!admin){
        return response.status(401).json({
            error: "User not authorized"
        })
    }

    next()
}
