import { Request, Response } from 'express';
import { GetOnePlayerAllDataSeasonService } from '../../services/DataSeason/GetOnePlayerAllDataSeasonService';

class GetOnePlayerAllDataSeasonController {
    async handle(request: Request, response: Response){
        const getOnePlayerAllDataSeasonService = new GetOnePlayerAllDataSeasonService();
        
        const { playerId } = request;

        const data = await getOnePlayerAllDataSeasonService.execute({ playerId });

        return response.status(200).json(data)
    }
}

export { GetOnePlayerAllDataSeasonController }
