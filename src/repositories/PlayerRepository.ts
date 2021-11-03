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
}

export { PlayerRepository }
