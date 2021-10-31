import { Request, Response } from 'express';
import { CreatePlayerService } from '../../services/Player/CreatePlayerService'

class CreatePlayerController {
    async handle(request: Request, response: Response){
        const { name } = request.body;

        const createPlayerService = new CreatePlayerService();

        try {
            const player = await createPlayerService.execute({ name })
            return response.status(200).json(player)
        } catch (error) {
            return response.status(500).json(error)
        }
    }
}

export { CreatePlayerController }
