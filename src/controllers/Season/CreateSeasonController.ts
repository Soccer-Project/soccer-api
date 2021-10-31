import { Request, Response } from 'express';
import { CreateSeasonService } from '../../services/Season/CreateSeasonService';

class CreateSeasonController{
    async handle(request: Request, response: Response){
        const { name } = request.body

        const createSeasonService = new CreateSeasonService();

        try {
            const season = await createSeasonService.execute({ name });
            return response.status(200).json(season);
        } catch (error) {
            return response.status(500).json({message: 'season already exists'})
        }
    }
}

export { CreateSeasonController }
