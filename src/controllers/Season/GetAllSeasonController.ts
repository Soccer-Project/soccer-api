import { Request, Response } from 'express';
import { GetAllSeasonService } from '../../services/Season/GetAllSeasonService';

export class GetAllSeasonController{
    async handle(request: Request, response: Response): Promise<Response> {
        const getAllSeasonService = new GetAllSeasonService();
        
        try {
            const seasons = await getAllSeasonService.execute()
            return response.status(200).json(seasons)
        } catch (error) {
            return response.status(500).json({message: 'Error'})
        }
    }
}
