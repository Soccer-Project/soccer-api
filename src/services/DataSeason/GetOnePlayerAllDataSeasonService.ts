import { getCustomRepository } from 'typeorm';
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

    async execute(){
        try {
            const playerData = await this.dataSeasonRepository.findByPlayer(this.playerId)
            console.log(playerData)
            return playerData;
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

export { GetOnePlayerAllDataSeasonService }
