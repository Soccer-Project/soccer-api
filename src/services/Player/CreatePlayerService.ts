import { getCustomRepository } from 'typeorm';
import { Player } from '../../entities/Player';
import { PlayerRepository } from '../../repositories/PlayerRepository';
import { LoggerService } from '../common/LoggerService';

interface IPlayerRepository {
    playerRepository?: PlayerRepository,
    name: string,
}

class CreatePlayerService {
    private playerRepository: PlayerRepository
    private player: Player
    private loger: LoggerService = new LoggerService()

    constructor({
        playerRepository = getCustomRepository(PlayerRepository), 
        name
    }: IPlayerRepository) {
        this.playerRepository = playerRepository;
        this.player = new Player(name)
    }
        
    async execute(): Promise<Player> {
        const player: Player = await this.playerRepository.save(this.player);
        this.loger.trace(
            'Creating player',
            this.constructor.name
        )
        return player
    }
}

export { CreatePlayerService }
