import { getCustomRepository } from 'typeorm';
import { Player } from '../../entities/Player';
import { PlayerRepository } from '../../repositories/PlayerRepository';
import { LoggerService } from '../common/LoggerService';
class GetAllPlayerService {
    private playerRepository: PlayerRepository
    private loger: LoggerService = new LoggerService()

    constructor(playerRepository: PlayerRepository = getCustomRepository(PlayerRepository)){
        this.playerRepository = playerRepository;
    }
        
    async execute(): Promise<Player[]>{
        const players: Player[] = await this.playerRepository.getAll();
        this.loger.trace(
            'Getting players',
            this.constructor.name
        )
        return players
    }
}

export { GetAllPlayerService }
