import { Request, Response } from 'express';
import { AuthenticateUserService } from '../../services/User/AuthenticateUserService';

class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, password } = request.body

        const authenticateUserService = new AuthenticateUserService({name, password});

        try {
            const token = await authenticateUserService.execute()
            return response.status(200).json({token});
        } catch (error) {
            if(error.message === 'Not authenticated!'){
                return response.status(401).json({message: error.message})
            }
            return response.status(500).json(error)
        }

    }
}

export { AuthenticateUserController }
