import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity('seasons')
class Season {
    @PrimaryColumn()
    readonly season_id: string;

    @Column()
    name: string
}

export { Season }
