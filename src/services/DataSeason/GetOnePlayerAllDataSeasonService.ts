import { getRepository } from 'typeorm';
import { DataSeason } from '../../entities/DataSeason';

interface IPlayer {
    playerId: string;
}

class GetOnePlayerAllDataSeasonService {
    async execute({ playerId }: IPlayer){

        const data = await getRepository(DataSeason)
            .createQueryBuilder('dataSeason')
            .leftJoinAndSelect('dataSeason.playerId', 'players')
            .leftJoinAndSelect('dataSeason.seasonId', 'seasonId')
            .where('dataSeason.player_id = :player_id', { player_id: playerId})
            .getMany()
            
        return data;
    }
}

export { GetOnePlayerAllDataSeasonService }
