import { getCustomRepository } from 'typeorm';
import { Season } from '../../entities/Season';
import { SeasonRepository } from '../../repositories/SeasonRepository';

interface ISeasonRepository {
    seasonRepository?: SeasonRepository,
    name: string,
}

class CreateSeasonService{
    private seasonRepository: SeasonRepository
    private season: Season

    constructor({
        seasonRepository = getCustomRepository(SeasonRepository),
        name
    }: ISeasonRepository){
        this.seasonRepository = seasonRepository;
        this.season = new Season(name)
    }

    async execute(): Promise<Season>{
        const season: Season = await this.seasonRepository.save(this.season)
        console.log(season)
        return season;
    }
}

export { CreateSeasonService }
