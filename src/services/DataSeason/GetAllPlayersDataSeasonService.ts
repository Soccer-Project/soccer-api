
import { getCustomRepository } from 'typeorm';
import { DataSeason } from '../../entities/DataSeason';
import { DataSeasonRepository } from '../../repositories/DataSeasonRepository';
import { LoggerService } from '../common/LoggerService';

class GetAllPlayersDataSeasonService {
    private dataSeasonRepository: DataSeasonRepository
    private loger: LoggerService = new LoggerService()

    constructor(dataSeasonRepository = getCustomRepository(DataSeasonRepository)){
        this.dataSeasonRepository = dataSeasonRepository;
    }

    async execute(): Promise<DataSeason[]>{
        const data: DataSeason[] = await this.dataSeasonRepository.getAllPlayer();
        this.loger.trace(
            'Getting all players data',
            this.constructor.name
        )
        return data;
    }
}

export { GetAllPlayersDataSeasonService }
