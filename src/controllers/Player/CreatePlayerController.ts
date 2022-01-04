import { Request, Response } from 'express';
import { CreatePlayerService } from '../../services/Player/CreatePlayerService'

class CreatePlayerController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name } = request.body;

        if(name.length === 0){
            return response.status(505).json({message: 'Informe um nome válido'})
        }

        const createPlayerService = new CreatePlayerService({name});

        try {
            const player = await createPlayerService.execute()
            return response.status(200).json(player)
        } catch (error) {
            return response.status(500).json(error)
        }
    }
}

export { CreatePlayerController }
