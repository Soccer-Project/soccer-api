import { Request, Response } from 'express';
import { GetAllPlayersDataSeasonService } from '../../services/DataSeason/GetAllPlayersDataSeasonService';

class GetAllPlayersDataSeasonController{
    async handle(request: Request, response: Response): Promise<Response> {
        const getAllPlayersDataService = new GetAllPlayersDataSeasonService();

        try {
            const data = await getAllPlayersDataService.execute();
            return response.status(200).json(data)
        } catch (error) {
            return response.status(500).json({message: 'Error'})
        }
    }
}

export { GetAllPlayersDataSeasonController }
