import { EntityRepository, EntityManager } from "typeorm";
import { Player } from "../entities/Player";

@EntityRepository(Player)
export class PlayerRepository {
    private manager: EntityManager;

    constructor(manager: EntityManager) {
        this.manager = manager;
    }

    getAll = async (): Promise<Array<Player>> => {
        const players: Player[] = await this.manager.find(Player)
        return players
    }

    save = async (player: Player): Promise<Player> => {
        return this.manager.save(player)
    }

    findById = async (playerId: string): Promise<Player> => {
        const player: Player = await this.manager.findOne(Player, {
            where: {
                player_id: playerId,
            }
        })

        if(!player){
            throw {message: 'Player not found!'}
        }

        return player
    }
}
