import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity('players')
class Player {
    @PrimaryColumn()
    readonly player_id: string;

    @Column()
    name: string
}

export { Player }
