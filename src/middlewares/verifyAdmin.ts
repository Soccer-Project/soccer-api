import { Request, Response, NextFunction } from 'express';

export function verifyAdmin(request: Request, response: Response, next: NextFunction){

    const admin = request.params

    console.log(admin)

    if(admin){
        next()    
    }

    return response.status(401).json({
        error: "User not authorized"
    })

    
}
