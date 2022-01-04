import { getCustomRepository } from 'typeorm';
import { Player } from '../../entities/Player';
import { PlayerRepository } from '../../repositories/PlayerRepository';
class GetAllPlayerService {
    private playerRepository: PlayerRepository

    constructor(playerRepository: PlayerRepository = getCustomRepository(PlayerRepository)){
        this.playerRepository = playerRepository;
    }
        
    async execute(): Promise<Player[]>{
        const players: Player[] = await this.playerRepository.getAll();
        console.log(players)
        return players
    }
}

export { GetAllPlayerService }
