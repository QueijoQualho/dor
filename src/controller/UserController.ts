import { Request, Response } from "express";
import { User } from "src/entity/User";
import { UserRepositoryType } from "src/repository/userRepository";

export class UserController {

    constructor(private readonly userRepository: UserRepositoryType) { }

    async cadastro(req: Request, res: Response) {
        
        try {

            const user = req.body            
            const item = await this.userRepository.save(user)

            res.status(200).send(item)
        } catch {
            res.status(400).send({ message: 'Erro ao cadastrar usuario' })
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const users = await this.userRepository.find();
            res.status(200).send(users);
        } catch {
            res.status(500).send({ message: 'Erro ao buscar usuários' });
        }
    }
}