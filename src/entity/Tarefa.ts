import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Tarefa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @CreateDateColumn()
    data: string;

    @Column()
    prioridade: String;

    @Column()
    status: String;

    @ManyToOne(() => User, (user) => user.tarefas )
    user: User;
}