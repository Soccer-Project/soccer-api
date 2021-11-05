import { Entity, Column, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity('users')
class User {
    @PrimaryColumn()
    user_id: string;

    @Column()
    name: string;

    @Column()
    admin: boolean;

    @Column()
    password: string;

    constructor(name?: string) {
        if(!this.user_id){
            this.user_id = uuid();
        }
        this.name = name;
    }
}

export { User }
