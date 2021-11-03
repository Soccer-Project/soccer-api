
import { EntityRepository, EntityManager } from "typeorm";
import { Season } from "../entities/Season"

@EntityRepository(Season)
class SeasonRepository {
    private manager: EntityManager;

    constructor(manager: EntityManager) {
        this.manager = manager;
    }

    save = async (season: Season): Promise<Season> => {
        return this.manager.save(season)
    }

    findById = async (seasonId: string): Promise<Season> => {
        try {
            const season: Season = await this.manager.findOne(Season, {
                where: {
                    season_id: seasonId
                }
            })
            
            if(!season) {
                throw {mesage: "Season not found!"};
            }

            return season;
        } catch (error) {
            return Promise.reject(error)
        }
    }

    getAll = async (): Promise<Array<Season>> => {
        return this.manager.find(Season)
    }
}

export { SeasonRepository }
