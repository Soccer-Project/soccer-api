import { EntityRepository, EntityManager } from "typeorm";
import { DataSeason } from "../entities/DataSeason";

@EntityRepository(DataSeason)
class DataSeasonRepository {
    private manager: EntityManager;

    constructor(manager: EntityManager) {
        this.manager = manager;
    }

    save = async (dataSeason: DataSeason): Promise<DataSeason> => {
        return this.manager.save(dataSeason);
    }

    findByPlayer = async (playerId: string): Promise<Array<DataSeason>> => {
        try {
            const dataSeason: DataSeason[] = await this.manager.find(DataSeason, {
                where: {
                    player_id: playerId,
                },
                relations: ['Player', 'Season']
            })

            if(!dataSeason){
                throw {mesage: 'No data found!'}
            }

            return dataSeason;
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

export { DataSeasonRepository }
