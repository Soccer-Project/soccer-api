import { getCustomRepository } from 'typeorm';
import { DataSeason } from '../../entities/DataSeason';
import { DataSeasonRepository } from '../../repositories/DataSeasonRepository';

interface IPlayerDataRepository {
    dataSeasonRepository?: DataSeasonRepository;
    playerId: string,
}

class GetOnePlayerAllDataSeasonService {
    private dataSeasonRepository: DataSeasonRepository
    private playerId: string

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
            console.log('service log', playerData, allPlayerData)
            return { 
                detailed: playerData, 
                total: allPlayerData
            };
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

export { GetOnePlayerAllDataSeasonService }
