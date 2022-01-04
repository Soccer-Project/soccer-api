
import { EntityRepository, EntityManager } from "typeorm";
import { Season } from "../entities/Season"

@EntityRepository(Season)
export class SeasonRepository {
    private manager: EntityManager;

    constructor(manager: EntityManager) {
        this.manager = manager;
    }

    save = async (season: Season): Promise<Season> => {
        return this.manager.save(season)
    }

    findById = async (seasonId: string): Promise<Season> => {
        const season: Season = await this.manager.findOne(Season, {
            where: {
                season_id: seasonId
            }
        })
        
        if(!season) {
            throw {message: "Season not found!"};
        }

        return season;
    }

    getAll = async (): Promise<Array<Season>> => {
        return this.manager.find(Season)
    }
}
