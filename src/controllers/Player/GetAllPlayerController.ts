import { Request, Response } from 'express';
import { GetAllPlayerService } from '../../services/Player/GetAllPlayerService';

export class GetAllPlayerController{
    async handle(request: Request, response: Response): Promise<Response> {
        const getAllPlayerService = new GetAllPlayerService();
        
        try {
            const players = await getAllPlayerService.execute()
            return response.status(200).json(players)
        } catch (error) {
            return response.status(500).json({message: 'Error'})
        }
    }
}
