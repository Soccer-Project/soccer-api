import { getCustomRepository } from 'typeorm';
import { Season } from '../../entities/Season';
import { SeasonRepository } from '../../repositories/SeasonRepository';
import { LoggerService } from '../common/LoggerService';

interface ISeasonRepository {
    seasonRepository?: SeasonRepository,
    name: string,
}

class CreateSeasonService{
    private seasonRepository: SeasonRepository
    private season: Season
    private loger: LoggerService = new LoggerService()

    constructor({
        seasonRepository = getCustomRepository(SeasonRepository),
        name
    }: ISeasonRepository){
        this.seasonRepository = seasonRepository;
        this.season = new Season(name)
    }

    async execute(): Promise<Season>{
        const season: Season = await this.seasonRepository.save(this.season)
        this.loger.trace(
            'Creating season',
            this.constructor.name
        )
        return season;
    }
}

export { CreateSeasonService }
