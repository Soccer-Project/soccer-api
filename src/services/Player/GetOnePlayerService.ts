import { getRepository } from 'typeorm';
import { Player } from '../../entities/Player';

interface IPlayer {
    id: string;
}

class GetOnePlayerService {
    async execute({id }: IPlayer){
        const player = await getRepository(Player)
            .createQueryBuilder('players')
            .where("players.player_id = :id", { id: id })
            .getOne();

        return player
    }
}

export { GetOnePlayerService }
