import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
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
}

export { DataSeason }
