import { Entity, Column, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity('players')
class Player {
    @PrimaryColumn()
    player_id: string;

    @Column()
    name: string

    constructor(name?: string) {
        if(!this.player_id){
            this.player_id = uuid();
        }
        this.name = name;
    }
}

export { Player }
