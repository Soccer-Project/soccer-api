import { getCustomRepository } from 'typeorm';
import { DataSeason } from '../../entities/DataSeason';
import { DataSeasonRepository } from '../../repositories/DataSeasonRepository';
import { LoggerService } from '../common/LoggerService';

interface IDataSeasonRepository {
    dataSeasonRepository?: DataSeasonRepository,
    player_id: string,
    season_id: string,
    games?: number,
    goals?: number,
    assists?: number
}

class CreateDataSeasonService{

    private dataSeasonRepository: DataSeasonRepository
    private dataSeason: DataSeason
    private loger: LoggerService = new LoggerService()

    constructor({
        dataSeasonRepository = getCustomRepository(DataSeasonRepository),
        player_id,
        season_id,
        games,
        goals,
        assists
    }:IDataSeasonRepository){
        this.dataSeasonRepository = dataSeasonRepository;
        this.dataSeason = new DataSeason(player_id, season_id, games, goals, assists)
    } 

    async execute(): Promise<DataSeason>{
        const dataSeason: DataSeason = await this.dataSeasonRepository.save(this.dataSeason)
        this.loger.trace(
            'Creating player data',
            this.constructor.name
        )
        return dataSeason
    }
}

export { CreateDataSeasonService }
