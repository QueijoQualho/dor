import Database from "../database";
import { User } from "../entity/User";
import { EntityManager, Repository } from "typeorm";

export type UserRepositoryType = Repository<User>;
const databaseInstance = Database.getInstance();

const userRepository: UserRepositoryType = databaseInstance
  .getDataSource()
  .getRepository(User)
  .extend({});

export function getUserRepository(manager?: EntityManager): Repository<User> {
  if (manager) {
    return manager.withRepository(userRepository);
  }
  return userRepository;
}