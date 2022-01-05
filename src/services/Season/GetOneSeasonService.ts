import { getCustomRepository } from "typeorm";
import { Season } from "../../entities/Season";
import { SeasonRepository } from "../../repositories/SeasonRepository";
import { LoggerService } from "../common/LoggerService";

interface ISeasonRepository {
    seasonRepository?: SeasonRepository;
    seasonId: string;
}

class GetOneSeasonService {
    private seasonRepository: SeasonRepository;
    private seasonId: string;
    private loger: LoggerService = new LoggerService()

    constructor({
        seasonRepository = getCustomRepository(SeasonRepository),
        seasonId
    }:ISeasonRepository){
        this.seasonRepository = seasonRepository;
        this.seasonId = seasonId
    }

    async execute(): Promise<Season> {
        try {
            const season: Season = await this.seasonRepository.findById(this.seasonId);
            return season
        } catch (error) {
            this.loger.error(
                'Error to get season',
                error,
                this.constructor.name
            )
            return error
        }
    }
}

export { GetOneSeasonService }
