import { getCustomRepository } from "typeorm";
import { sign } from "jsonwebtoken";
import { UserRepository } from "../../repositories/UserRepository";
import { User } from "../../entities/User";
import { LoggerService } from '../common/LoggerService';

interface IAuthenticateRequest {
    userRepository?: UserRepository;
    name: string;
    password: string;
}

class AuthenticateUserService{
    private userRepository: UserRepository
    private name: string
    private password: string
    private loger: LoggerService = new LoggerService()

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
            this.loger.trace(
                'Getting user token',
                this.constructor.name
            )

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

            this.loger.trace(
                'Token generated',
                this.constructor.name
            )
            return token
        } catch (error) {
            this.loger.error(
                'Error to generate token',
                error,
                this.constructor.name
            )
            throw new Error(error.message)
        }
    }
}

export { AuthenticateUserService }
