import { getCustomRepository } from "typeorm";
import { SeasonRepository } from "../../repositories/SeasonRepository";

interface ISeasonRepository {
    seasonRepository: SeasonRepository;
}
export class GetAllSeasonService {
    private seasonRepository: SeasonRepository;

    constructor({
        seasonRepository = getCustomRepository(SeasonRepository)
    }){
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
