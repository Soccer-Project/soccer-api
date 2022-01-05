import { getCustomRepository } from 'typeorm';
import { Player } from '../../entities/Player';
import { PlayerRepository } from '../../repositories/PlayerRepository';
import { LoggerService } from '../common/LoggerService';

interface IPlayerRepository {
    playerRepository?: PlayerRepository;
    playerId: string,
}

class GetOnePlayerService {
    private playerRepository: PlayerRepository
    private playerId: string
    private loger: LoggerService = new LoggerService()

    constructor({
        playerRepository = getCustomRepository(PlayerRepository), 
        playerId
    }: IPlayerRepository) {
        this.playerRepository = playerRepository;
        this.playerId = playerId
    }
        
    async execute(): Promise<Player>{
        try {
            const player: Player = await this.playerRepository.findById(this.playerId);
            this.loger.trace(
                'Getting player',
                this.constructor.name
            )
            return player
        } catch (error) {
            this.loger.error(
                'Error to get player',
                error,
                this.constructor.name
            )
            return error
        }
    }
}

export { GetOnePlayerService }
