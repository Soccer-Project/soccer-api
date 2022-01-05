import { getCustomRepository } from 'typeorm';
import { DataSeason } from '../../entities/DataSeason';
import { DataSeasonRepository } from '../../repositories/DataSeasonRepository';
import { LoggerService } from '../common/LoggerService';

interface IPlayerDataRepository {
    dataSeasonRepository?: DataSeasonRepository;
    playerId: string,
}

class GetOnePlayerAllDataSeasonService {
    private dataSeasonRepository: DataSeasonRepository
    private playerId: string
    private loger: LoggerService = new LoggerService()

    constructor({
        dataSeasonRepository = getCustomRepository(DataSeasonRepository),
        playerId
    }: IPlayerDataRepository ){
        this.dataSeasonRepository = dataSeasonRepository;
        this.playerId = playerId;
    }

    async execute(): Promise< { detailed: DataSeason[], total: DataSeason } > {
        try {
            const playerData = await this.dataSeasonRepository.findByPlayer(this.playerId)
            const allPlayerData = await this.dataSeasonRepository.findAllDataByPlayer(this.playerId)
            this.loger.trace(
                'Getting player data',
                this.constructor.name
            )

            return { 
                detailed: playerData, 
                total: allPlayerData
            };
        } catch (error) {
            this.loger.error(
                'Error to get player data',
                error,
                this.constructor.name
            )
            return error
        }
    }
}

export { GetOnePlayerAllDataSeasonService }
