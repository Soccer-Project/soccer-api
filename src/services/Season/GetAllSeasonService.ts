import { getCustomRepository } from "typeorm";
import { Season } from "../../entities/Season";
import { SeasonRepository } from "../../repositories/SeasonRepository";
import { LoggerService } from "../common/LoggerService";

export class GetAllSeasonService {
    private seasonRepository: SeasonRepository;
    private loger: LoggerService = new LoggerService();

    constructor(
        seasonRepository: SeasonRepository = getCustomRepository(SeasonRepository)
    ){
        this.seasonRepository = seasonRepository;
    }

    async execute(): Promise<Season[]>{
        try {
            const seasons: Season[] = await this.seasonRepository.getAll()
            return seasons;
        } catch (error) {
            this.loger.error(
                'Error to get seasons',
                error,
                this.constructor.name
            )
            return error
        }
    }
}
