
import { getRepository } from 'typeorm';
import { v4 as uuid } from "uuid";
import { Player } from '../../entities/Player';

interface IPlayer {
    name: string;
}

class CreatePlayerService {
    async execute({ name }: IPlayer){
        const player = await getRepository(Player)
        .createQueryBuilder()
        .insert()
        .into(Player)
        .values([
            {   
                player_id: uuid(),
                name
            }
        ])
        .execute();

        return player.identifiers;
    }
}

export { CreatePlayerService }
