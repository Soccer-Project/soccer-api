import { Request, Response } from 'express';
import { CreateDataSeasonService } from '../../services/DataSeason/CreateDataSeasonService';

class CreateDataSeasonController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { player_id, season_id, games, goals, assists } = request.body;

        const createDataSeasonService = new CreateDataSeasonService({
            player_id, season_id, games, goals, assists
        });

        try {
            const dataSeason = await createDataSeasonService.execute()
            return response.status(200).json(dataSeason)
        } catch (error) {
            return response.status(500).json(error)
        }
    }
}

export { CreateDataSeasonController }
