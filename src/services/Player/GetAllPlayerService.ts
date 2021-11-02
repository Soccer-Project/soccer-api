import { getCustomRepository } from 'typeorm';
import { PlayerRepository } from '../../repositories/PlayerRepository';
class GetAllPlayerService {
    private playerRepository: PlayerRepository

    constructor(playerRepository: PlayerRepository = getCustomRepository(PlayerRepository)){
        this.playerRepository = playerRepository;
    }
        
    async execute(){
        const players = await this.playerRepository.getAll();
        console.log(players)
        return players
    }
}

export { GetAllPlayerService }
