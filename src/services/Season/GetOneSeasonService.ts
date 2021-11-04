import { getCustomRepository } from "typeorm";
import { SeasonRepository } from "../../repositories/SeasonRepository";

interface ISeasonRepository {
    seasonRepository?: SeasonRepository;
    seasonId: string;
}

class GetOneSeasonService {
    private seasonRepository: SeasonRepository;
    private seasonId: string;

    constructor({
        seasonRepository = getCustomRepository(SeasonRepository),
        seasonId
    }:ISeasonRepository){
        this.seasonRepository = seasonRepository;
        this.seasonId = seasonId
    }

    async execute(){
        try {
            const season = await this.seasonRepository.findById(this.seasonId);
            console.log(season)
            return season
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

export { GetOneSeasonService }
