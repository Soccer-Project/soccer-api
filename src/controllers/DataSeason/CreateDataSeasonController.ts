import { Request, Response } from 'express';
import { CreateDataSeasonService } from '../../services/DataSeason/CreateDataSeasonService';

class CreateDataSeasonController {
    async handle(request: Request, response: Response){
        const createDataSeasonService = new CreateDataSeasonService();
        
        const { player_id, season_id, games, goals, assists } = request.body;

        const dataSeason = await createDataSeasonService.execute({ player_id, season_id, games, goals, assists })

        return response.status(200).json(dataSeason)
    }
}

export { CreateDataSeasonController }
