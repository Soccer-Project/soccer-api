import {getRepository} from "typeorm";
import { Season } from "../../entities/Season";

interface ISeason {
    name: string;
}

class GetOneSeasonService {
    async execute({ name }: ISeason){
        const getSeason = await getRepository(Season)
            .createQueryBuilder('seasons')
            .where('seasons.name = :name', { name })
            .getOne()

        return {
            seasonId: getSeason.season_id,
            name: getSeason.name
        }
    }
}

export { GetOneSeasonService }
