import { getCustomRepository } from 'typeorm';
import { Player } from '../../entities/Player';
import { PlayerRepository } from '../../repositories/PlayerRepository';

interface IPlayerRepository {
    playerRepository?: PlayerRepository,
    name: string,
}

class CreatePlayerService {
    private playerRepository: PlayerRepository
    private player: Player;

    constructor({
        playerRepository = getCustomRepository(PlayerRepository), 
        name
    }: IPlayerRepository) {
        this.playerRepository = playerRepository;
        this.player = new Player(name)
    }
        
    async execute(): Promise<Player> {
        const player: Player = await this.playerRepository.save(this.player);
        console.log(player)
        return player
    }
}

export { CreatePlayerService }
