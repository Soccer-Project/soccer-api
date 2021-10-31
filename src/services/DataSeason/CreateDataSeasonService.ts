
import { getRepository } from 'typeorm';
import { v4 as uuid } from "uuid";
import { DataSeason } from '../../entities/DataSeason';

interface IDataSeason {
    player_id: string,
    season_id: string,
    games?: number,
    goals?: number,
    assists?: number
}

class CreateDataSeasonService{
    async execute({ player_id, season_id, games, goals, assists}: IDataSeason){
        
        const dataSeason = await getRepository(DataSeason)
        .createQueryBuilder()
        .insert()
        .into(DataSeason)
        .values([
            {   
                data_season_id: uuid(),
                player_id: player_id,
                season_id: season_id,
                games: games,
                goals: goals,
                assists: assists
            }
        ])
        .execute();

        return dataSeason.identifiers;

    }
}

export { CreateDataSeasonService }
