import { Request, Response } from "express";
import comicsSchema from "../schema/comics.schema";
import comicsService from "../service/comics.service";
import axios from "axios";

class comicsController {

    async findAll(req: Request, res: Response) {
        try {

            const response = await axios.get('http://gateway.marvel.com/v1/public/events/314/comics?&ts=1&apikey=0515f2f73687e7e96e3456433930f647&hash=fcd379931c2e34707632ef517094bcd5');

            const comicsData = response.data.data.results;

            const comicsWithoutId = comicsData.map((comics: any) => {
                const { _id, ...rest } = comics;
                return rest;
            });

            const insertedComics = await comicsSchema.insertMany(comicsWithoutId);

            res.json(insertedComics);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar quadrinhos" });
        }
    }
    async findById(req: Request, res: Response) {
        try {
            const comicsId = req.params.id;

            const response = await axios.get(`http://gateway.marvel.com/v1/public/comics/${comicsId}?&ts=1&apikey=0515f2f73687e7e96e3456433930f647&hash=fcd379931c2e34707632ef517094bcd5`);

            const comicsData = response.data.data.results;

            res.json(comicsData);
        } catch (error) {
            console.error("Erro ao buscar personagem por ID:", error);
            res.status(500).json({ error: "Erro ao buscar personagem por ID" });
        }
    }

    /*--------------------------------------------------------------------------------*/

    async findAllBanco(req: Request, res: Response) {
        try {
            const comics = await comicsService.findAllBanco();
            return res.json(comics);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar quadrinho no banco" });
        }
    }
    
    async findByIdBanco(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const comicFound = await comicsService.findByIdBanco(id);
            return res.json(comicFound);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar quadrinho por id no banco" });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const comicCreated = await comicsService.create(req.body);
            res.status(201).json(comicCreated);
        } catch (error) {
            res.status(500).json({ error: "Erro na criação personagem" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const comicUpdated = await comicsService.update(req.params.id, req.body);
            res.json(comicUpdated);
        } catch (error) {
            res.status(500).json({ error: "Erro na atualização do quadrinho" });
        }
    }

    async delete(req: Request, res: Response) {
        const deleteMessage = await comicsService.delete(req.params.id)
        return res.json(deleteMessage)
    }
}

export default new comicsController;