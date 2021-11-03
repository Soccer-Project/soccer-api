import { Entity, Column, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity('seasons')
class Season {
    @PrimaryColumn()
    season_id: string;

    @Column()
    name: string

    constructor(name?: string) {
        if(!this.season_id){
            this.season_id = uuid();
        }
        this.name = name;
    }
}

export { Season }
