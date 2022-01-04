import { getCustomRepository } from "typeorm";
import { Season } from "../../entities/Season";
import { SeasonRepository } from "../../repositories/SeasonRepository";

export class GetAllSeasonService {
    private seasonRepository: SeasonRepository;

    constructor(
        seasonRepository: SeasonRepository = getCustomRepository(SeasonRepository)
    ){
        this.seasonRepository = seasonRepository;
    }

    async execute(): Promise<Season[]>{
        try {
            const seasons: Season[] = await this.seasonRepository.getAll()
            console.log(seasons)
            return seasons;
        } catch (error) {
            console.log(error)
            return error
        }
    }
}
