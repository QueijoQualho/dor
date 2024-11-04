import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Tarefa } from "./Tarefa"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    email: string

    @OneToMany(()=> Tarefa, (tarefa) => tarefa.user)
    tarefas: Tarefa[]

}
