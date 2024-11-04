import { Router, Express, Request, Response } from "express";
import { TarefaController } from "./controller/tarefaController";
import { getTarefaRepository } from "./repository/tarefaRepository";
import { getUserRepository } from "./repository/userRepository";
import { UserController } from "./controller/UserController";

export default (app: Express) => {
    const authController = new UserController(getUserRepository());
    const tarefaController = new TarefaController(getTarefaRepository());

    const router = Router();

    // Rotas de usuário
    router.post("/user", (req: Request, res: Response) => authController.cadastro(req, res));
    router.get("/user", (req: Request, res: Response) => authController.getAll(req, res));

    // Rotas de tarefas
    router.post("/tarefa", (req: Request, res: Response) => tarefaController.createTarefa(req, res));
    router.get("/tarefa", (req: Request, res: Response) => tarefaController.getTarefas(req, res));
    router.patch("/tarefa/:id", (req: Request, res: Response) => tarefaController.updateTarefa(req, res));
    router.delete("/tarefa/:id", (req: Request, res: Response) => tarefaController.deleteTarefa(req, res));

    // Prefixo da API
    app.use("/api", router);
};
