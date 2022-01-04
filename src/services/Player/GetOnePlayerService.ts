import { getCustomRepository } from 'typeorm';
import { Player } from '../../entities/Player';
import { PlayerRepository } from '../../repositories/PlayerRepository';

interface IPlayerRepository {
    playerRepository?: PlayerRepository;
    playerId: string,
}

class GetOnePlayerService {
    private playerRepository: PlayerRepository
    private playerId: string;

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
            console.log(player)
            return player
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

export { GetOnePlayerService }
