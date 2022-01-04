import { getCustomRepository } from "typeorm";
import { sign } from "jsonwebtoken";
import { UserRepository } from "../../repositories/UserRepository";
import { User } from "../../entities/User";

interface IAuthenticateRequest {
    userRepository?: UserRepository;
    name: string;
    password: string;
}

class AuthenticateUserService{
    private userRepository: UserRepository
    private name: string
    private password: string

    constructor({
        userRepository = getCustomRepository(UserRepository),
        name,
        password
    }: IAuthenticateRequest){
        this.userRepository = userRepository;
        this.name = name;
        this.password = password;
    }

    async execute(): Promise<string> {
        try {
            const user: User[] = await this.userRepository.findByName(this.name, this.password);

            if(user[0] === undefined){
                throw {message: 'Not authenticated!'}
            }

            const token: string = sign({
                name: user[0].name,
            }, process.env.TOKEN,
            {
                subject: user[0].user_id,
                expiresIn: "1h"
            })

            return token
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    }
}

export { AuthenticateUserService }
