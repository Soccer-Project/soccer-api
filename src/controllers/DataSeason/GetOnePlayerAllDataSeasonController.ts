import { Request, Response } from 'express';
import { GetOnePlayerAllDataSeasonService } from '../../services/DataSeason/GetOnePlayerAllDataSeasonService';

class GetOnePlayerAllDataSeasonController {
    async handle(request: Request, response: Response){
        const { playerId } = request.params;
        
        const getOnePlayerAllDataSeasonService = new GetOnePlayerAllDataSeasonService({ playerId });

        try {
            const data = await getOnePlayerAllDataSeasonService.execute();
            console.log('controller', data)
            return response.status(200).json(data)
        } catch (error) {
            return response.status(500).json({message: 'Error'})
        }
    }
}

export { GetOnePlayerAllDataSeasonController }
