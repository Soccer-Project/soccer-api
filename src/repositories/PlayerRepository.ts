import { EntityRepository, EntityManager } from "typeorm";
import { Player } from "../entities/Player";

@EntityRepository(Player)
class PlayerRepository {
    private manager: EntityManager;

    constructor(manager: EntityManager) {
        this.manager = manager;
    }

    getAll = async (): Promise<Array<Player>> => {
        return this.manager.find(Player)
    }

    save = async (player: Player): Promise<Player> => {
        return this.manager.save(player)
    }

    findById = async (playerId: string): Promise<Player> => {
        try {
            const player: Player = await this.manager.findOne(Player, {
                where: {
                    player_id: playerId,
                }
            })

            if(!player){
                throw {message: 'Player not found!'}
            }

            return player
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

export { PlayerRepository }
