import { Request, Response } from "express";
import creatorSchema from "../schema/creators.schema";
import creatorService from "../service/creators.service";
import axios from "axios";

class creatorController {
    async findAll(req: Request, res: Response) {
        try {

            const response = await axios.get(' http://gateway.marvel.com/v1/public/events/314/creators?ts=1&apikey=d30c9fc66d3d6906df988cffc78ae86a&hash=41adcf82f191215ea4eee5854c9c4a7f');

            const creatorData = response.data.data.results;

            const allCreator = creatorData.map((creator: any) => {
                const { _id, ...rest } = creator;
                return rest;
            });

            const insertedCreators = await creatorSchema.insertMany(allCreator);

            res.json(insertedCreators);
        } catch (error) {
            console.error("Erro ao buscar criador:", error);
            res.status(500).json({ error: "Erro ao buscar criador" });
        }
    }
    async findById(req: Request, res: Response) {
        try {
            const creatorId = req.params.id;

            const response = await axios.get(`http://gateway.marvel.com/v1/public/creators/${creatorId}?&ts=1&apikey=d30c9fc66d3d6906df988cffc78ae86a&hash=41adcf82f191215ea4eee5854c9c4a7f`);

            const creatorData = response.data.data.results;
            res.json(creatorData);

        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar criador por ID" });
        }
    }

    /*-------------------------------------------------------------------------------*/

    async create(req: Request, res: Response) {
        try {
            const creatorCreated = await creatorService.create(req.body);
            res.status(201).json(creatorCreated);
        } catch (error) {
            console.error("Erro ao criar criador:", error);
            res.status(500).json({ error: "Erro ao criar criador" });
        }
    }

    async findAllBanco(req: Request, res: Response) {
        try {
            const creator = await creatorService.findAll();
            return res.json(creator);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar criadores no banco" })
        }
    }

    async findByIdBanco(req: Request, res: Response) {
        try {
            const id = req.params.id
            const creatorFound = await creatorService.findByIdBanco(id)
            return res.json(creatorFound)
        } catch (error) {

            return res.status(500).json({ error: "Erro ao buscar criador por ID no banco" })
        }
    }
    async update(req: Request, res: Response) {
        try {
            const creatorId = req.params.id;
            const updatedCreatorData = req.body;
            const creatorUpdated = await creatorService.update(creatorId, updatedCreatorData);
            res.json(creatorUpdated);
        } catch (error) {
            res.status(500).json({ error: "Erro na atualização do criador" });
        }
    }


    async delete(req: Request, res: Response) {
        const deleteMessage = await creatorService.delete(req.params.id)
        return res.json(deleteMessage)
    }
}

export default new creatorController;