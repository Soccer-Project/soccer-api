import { getCustomRepository } from "typeorm";
import { SeasonRepository } from "../../repositories/SeasonRepository";

export class GetAllSeasonService {
    private seasonRepository: SeasonRepository;

    constructor(
        seasonRepository: SeasonRepository = getCustomRepository(SeasonRepository)
    ){
        this.seasonRepository = seasonRepository;
    }

    async execute(){
        try {
            const seasons = await this.seasonRepository.getAll()
            console.log(seasons)
            return seasons;
        } catch (error) {
            console.log(error)
            return error
        }
    }
}
