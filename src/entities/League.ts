import { Entity, Column, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity('leagues')
export class League {
    @PrimaryColumn()
    league_id: string;

    @Column()
    name: string

    constructor(name?: string) {
        if(!this.league_id){
            this.league_id = uuid();
        }
        this.name = name;
    }
}
