import Database from "../database";
import { Tarefa } from "../entity/Tarefa";
import { EntityManager, Repository } from "typeorm";

export type TarefaRepositoryType = Repository<Tarefa>;
const databaseInstance = Database.getInstance();

const tarefaRepository: TarefaRepositoryType = databaseInstance
  .getDataSource()
  .getRepository(Tarefa)
  .extend({});

export function getTarefaRepository(manager?: EntityManager): Repository<Tarefa> {
  if (manager) {
    return manager.withRepository(tarefaRepository);
  }
  return tarefaRepository;
}