
import { getCustomRepository } from 'typeorm';
import { DataSeasonRepository } from '../../repositories/DataSeasonRepository';

class GetAllPlayersDataSeasonService {
    private dataSeasonRepository: DataSeasonRepository

    constructor(dataSeasonRepository = getCustomRepository(DataSeasonRepository)){
        this.dataSeasonRepository = dataSeasonRepository;
    }

    async execute(){
        const data = await this.dataSeasonRepository.getAllPlayer();
        console.log(data)
        return data;
    }
}

export { GetAllPlayersDataSeasonService }
