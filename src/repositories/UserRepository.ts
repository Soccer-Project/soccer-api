import { EntityRepository, EntityManager } from "typeorm";
import { User } from "../entities/User";

@EntityRepository(User)
export class UserRepository{
    private manager: EntityManager;

    constructor(manager: EntityManager) {
        this.manager = manager;
    }

    findByName = async (name: string, password: string): Promise<Array<User>> => {
        const user: User[] = await this.manager.find(User, {
            where: { 
                name: name,
                password: password
            }
        })

        return user;
    }
}
