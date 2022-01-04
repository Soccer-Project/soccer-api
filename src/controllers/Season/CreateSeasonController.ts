import { Request, Response } from 'express';
import { CreateSeasonService } from '../../services/Season/CreateSeasonService';

class CreateSeasonController{
    async handle(request: Request, response: Response): Promise<Response> {
        const { name } = request.body

        const createSeasonService = new CreateSeasonService({name});

        try {
            const season = await createSeasonService.execute();
            return response.status(200).json(season);
        } catch (error) {
            return response.status(500).json(error)
        }
    }
}

export { CreateSeasonController }
