import { Request, Response } from 'express';
import { GetAllPlayersDataSeasonService } from '../../services/DataSeason/GetAllPlayersDataSeasonService';

class GetAllPlayersDataSeasonController{
    async handle(request: Request, response: Response){
        const getAllPlayersDataService = new GetAllPlayersDataSeasonService();

        const data = await getAllPlayersDataService.execute();

        return response.status(200).json(data)
    }
}

export { GetAllPlayersDataSeasonController }
