import { EntityRepository, EntityManager } from "typeorm";
import { DataSeason } from "../entities/DataSeason";

@EntityRepository(DataSeason)
export class DataSeasonRepository {
    private manager: EntityManager;

    constructor(manager: EntityManager) {
        this.manager = manager;
    }

    save = async (dataSeason: DataSeason): Promise<DataSeason> => {
        return this.manager.save(dataSeason);
    }

    findByPlayer = async (playerId: string): Promise<Array<DataSeason>> => {
        const dataSeason: DataSeason[] = await this.manager.find(DataSeason, {
            where: {
                player_id: playerId,
            },
            relations: ['playerId', 'seasonId']
        })        
        return dataSeason;
    }

    findAllDataByPlayer = async (playerId: string): Promise<DataSeason> => {
        const data: DataSeason = await this.manager.createQueryBuilder(DataSeason, 'dataSeason')
            .select("SUM(dataSeason.games)", "games")
            .addSelect("SUM(dataSeason.goals)", "goals")
            .addSelect("SUM(dataSeason.assists)", "assists")
            .leftJoinAndSelect('dataSeason.playerId', 'players')
            .leftJoin('dataSeason.seasonId', 'seasonId')
            .groupBy('dataSeason.playerId')
            .where("dataSeason.playerId = :playerId", { playerId })
            .getRawOne()
    
        console.log(data)
        return data
    }

    getAllPlayer = async(): Promise<Array<DataSeason>> => {
        const data: DataSeason[] = await this.manager.createQueryBuilder(DataSeason, 'dataSeason')
            .select("SUM(dataSeason.games)", "games")
            .addSelect("SUM(dataSeason.goals)", "goals")
            .addSelect("SUM(dataSeason.assists)", "assists")
            .leftJoinAndSelect('dataSeason.playerId', 'players')
            .leftJoin('dataSeason.seasonId', 'seasonId')
            .groupBy('dataSeason.playerId')
            .getRawMany()
    
        console.log(data)
        return data
    }
}
