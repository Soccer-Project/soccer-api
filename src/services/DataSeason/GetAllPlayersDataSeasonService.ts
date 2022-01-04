
import { getCustomRepository } from 'typeorm';
import { DataSeason } from '../../entities/DataSeason';
import { DataSeasonRepository } from '../../repositories/DataSeasonRepository';

class GetAllPlayersDataSeasonService {
    private dataSeasonRepository: DataSeasonRepository

    constructor(dataSeasonRepository = getCustomRepository(DataSeasonRepository)){
        this.dataSeasonRepository = dataSeasonRepository;
    }

    async execute(): Promise<DataSeason[]>{
        const data: DataSeason[] = await this.dataSeasonRepository.getAllPlayer();
        console.log(data)
        return data;
    }
}

export { GetAllPlayersDataSeasonService }
