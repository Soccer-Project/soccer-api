
import { getRepository } from 'typeorm';
import { DataSeason } from '../../entities/DataSeason';

class GetAllPlayersDataSeasonService {
    async execute(){
        const data = await getRepository(DataSeason)
            .createQueryBuilder('dataSeason')
            .leftJoinAndSelect('dataSeason.playerId', 'players')
            .leftJoin('dataSeason.seasonId', 'seasonId')
            .groupBy('dataSeason.playerId')
            .getMany()

        return data;
    }

}

export { GetAllPlayersDataSeasonService }
