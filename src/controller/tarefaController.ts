import { Request, Response } from "express";
import { Tarefa } from "../entity/Tarefa";
import { TarefaRepositoryType } from "../repository/tarefaRepository";

export class TarefaController {
    constructor(private readonly tarefaRepository: TarefaRepositoryType) { }

    async createTarefa(req: Request, res: Response) {
        try {
            const tarefaData: Partial<Tarefa> = req.body;
            const tarefa = await this.tarefaRepository.save(tarefaData);
            res.status(201).json(tarefa);
        } catch (error) {
            res.status(500).json({ message: "Erro ao criar a tarefa", error });
        }
    }

    async getTarefas(req: Request, res: Response) {
        try {
            const tarefas = await this.tarefaRepository.find();
            res.status(200).json(tarefas);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar as tarefas", error });
        }
    }

    async updateTarefa(req: Request, res: Response) {
        try {
            const tarefaId = parseInt(req.params.id);
            const tarefaData: Partial<Tarefa> = req.body;
            const tarefaAtualizada = await this.tarefaRepository.update(tarefaId, tarefaData);

            if (!tarefaAtualizada) {
                res.status(404).json({ message: "Tarefa não encontrada" });
            }

            res.status(200).json(tarefaAtualizada);
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar a tarefa", error });
        }
    }

    async deleteTarefa(req: Request, res: Response) {
        try {
            const tarefaId = parseInt(req.params.id);
            const sucesso = await this.tarefaRepository.delete(tarefaId);

            if (!sucesso) {
                res.status(404).json({ message: "Tarefa não encontrada" });
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Erro ao deletar a tarefa", error });
        }
    }
}
