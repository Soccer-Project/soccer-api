import { getCustomRepository } from "typeorm";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../repositories/UserRepository";

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

    async execute(){
        try {
            const user = await this.userRepository.findByName(this.name, this.password);

            if(user.name === undefined){
                throw new Error('Not authorize!')
            }

            const token = jwt.sign({
                name: user.name,
            }, process.env.TOKEN,
            {
                subject: user.user_id,
                expiresIn: "1h"
            })

            return token
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

export { AuthenticateUserService }
