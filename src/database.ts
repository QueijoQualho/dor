import { DataSource } from "typeorm";
import { AppDataSource } from "./data-source";

class Database {
  private static instance: Database;
  private dataSource: DataSource;

  private constructor() {
    this.dataSource = AppDataSource;
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async initialize() {
    try {
      if (!this.dataSource.isInitialized) {
        await this.dataSource.initialize();
        console.log("foi");
      }
    } catch (error) {
      throw error;
    }
  }

  public getDataSource(): DataSource {
    return this.dataSource;
  }
}

export default Database;