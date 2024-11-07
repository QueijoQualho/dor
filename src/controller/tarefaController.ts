import { Request, Response } from "express";
import { TarefaRepositoryType } from "../repository/tarefaRepository";
import { validate } from "class-validator";
import { TarefaDTO } from "../dto/tarefaDTO";

export class TarefaController {
    constructor(private readonly tarefaRepository: TarefaRepositoryType) { }

    async createTarefa(req: Request, res: Response) {
        try {
            const tarefaDTO = Object.assign(new TarefaDTO(), req.body);

            const errors = await validate(tarefaDTO);
            if (errors.length > 0) {
                res.status(400).json({
                    message: "Erro de validação"
                });
            } else {
                const tarefa = await this.tarefaRepository.save(tarefaDTO);
                res.status(201).json(tarefa);
            }


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
            const tarefaDTO = Object.assign(new TarefaDTO(), req.body);

            const errors = await validate(tarefaDTO);
            if (errors.length > 0) {
                res.status(400).json({
                    message: "Erro de validação"
                });
            } else {
                const tarefaAtualizada = await this.tarefaRepository.update(tarefaId, tarefaDTO);

                if (!tarefaAtualizada) {
                    res.status(404).json({ message: "Tarefa não encontrada" });
                } else {
                    res.status(200).json(tarefaAtualizada);
                }


            }

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
            } else {
                res.status(204).send();
            }

        } catch (error) {
            res.status(500).json({ message: "Erro ao deletar a tarefa", error });
        }
    }
}
