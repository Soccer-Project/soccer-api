import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from "uuid";
import { Player } from './Player';
import { Season } from './Season';

@Entity('dataSeason')
class DataSeason {
    @PrimaryColumn()
    data_season_id: string;

    @Column()
    player_id: string;

    @JoinColumn({ name: 'player_id', })
    @ManyToOne(() => Player)
    playerId: Player;

    @Column()
    season_id: string;

    @JoinColumn({ name: 'season_id', })
    @ManyToOne(() => Season)
    seasonId: Season;

    @Column()
    games: number

    @Column()
    goals: number

    @Column()
    assists: number

    constructor(
        player_id?: string,
        season_id?: string,
        games?: number,
        goals?: number,
        assists?: number
    ){
        if(!this.data_season_id){
            this.data_season_id = uuid();
        }
        this.player_id = player_id
        this.season_id = season_id
        this.games = games
        this.goals = goals
        this.assists = assists
    }
}

export { DataSeason }
