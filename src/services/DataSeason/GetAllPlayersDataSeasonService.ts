
import { getRepository } from 'typeorm';
import { DataSeason } from '../../entities/DataSeason';

class GetAllPlayersDataSeasonService {
    async execute(){
        const data = await getRepository(DataSeason)
            .createQueryBuilder('dataSeason')
            .select("SUM(dataSeason.games)", "games")
            .addSelect("SUM(dataSeason.goals)", "goals")
            .addSelect("SUM(dataSeason.assists)", "assists")
            // .select('dataSeason.goals')
            .leftJoinAndSelect('dataSeason.playerId', 'players')
            .leftJoin('dataSeason.seasonId', 'seasonId')
            // .select("SUM(dataSeason.goals)", "sum")
            .groupBy('dataSeason.playerId')
            .getRawMany()

        console.log(data)
        return data;
    }

}

export { GetAllPlayersDataSeasonService }
