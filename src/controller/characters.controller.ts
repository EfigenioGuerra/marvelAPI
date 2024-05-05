import { Request, Response } from "express";
import characterSchema from "../schema/characters.schema";
import characterService from "../service/characters.service";
import axios from "axios";
import creatorsService from "../service/creators.service";

class charactersController {

    async findAll(req: Request, res: Response) {
        try {
            const response = await axios.get('https://gateway.marvel.com/v1/public/events/314/characters?&ts=1&apikey=0515f2f73687e7e96e3456433930f647&hash=fcd379931c2e34707632ef517094bcd5');

            const charactersData = response.data.data.results;

            const charactersWithoutId = charactersData.map((character: any) => {
                const { _id, ...rest } = character;
                return rest;
            });

            const insertedCharacters = await characterSchema.insertMany(charactersWithoutId);

            res.json(insertedCharacters);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar personagens" });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const personagemId = req.params.id;

            const response = await axios.get(`http://gateway.marvel.com/v1/public/characters/${personagemId}?&ts=1&apikey=0515f2f73687e7e96e3456433930f647&hash=fcd379931c2e34707632ef517094bcd5`);

            const characterData = response.data.data.results;

            res.json(characterData);
        } catch (error) {
            console.error("Erro ao buscar personagem por ID:", error);
            res.status(500).json({ error: "Erro ao buscar personagem por ID" });
        }
    }

    /*-------------------------------------------------------------------------------------------*/

    async findAllBanco(req: Request, res: Response) {
        try {
            const personagens = await characterService.findAll();
            return res.json(personagens);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar personagens no banco" });
        }
    }

    async findByIdBanco(req: Request, res: Response) {
        try {
            const id = req.params.id; 
            const findedPersonagem = await characterService.findByIdBanco(id);
            return res.json(findedPersonagem);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar personagem no banco" });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const createdPersonagem = await characterService.create(req.body);
            res.status(201).json(createdPersonagem);
        } catch (error) {
            res.status(500).json({ error: "Erro na criação do personagem" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const personagemId = req.params.id;
            const personagemData = req.body;
            const updatedPersonagem = await characterService.update(personagemId, personagemData);
            res.json(updatedPersonagem);
        } catch (error) {
            res.status(500).json({ error: "Erro na atualização do personagem" });
        }
    }

    async delete(req: Request, res: Response) {
        const deleteMessage = await characterService.delete(req.params.id)
        return res.json(deleteMessage)
    }

    async findCharactersWithComicsAbove1000(req: Request, res: Response) {
        try {
            const characters = await characterService.findCharactersWithComicsAbove1000();
            res.json(characters);
        } catch (error) {
            console.error('Error finding characters with comics above 1000:', error);
            res.status(500).json({ error: 'Failed to find characters with comics above 1000' });
        }
    }

    async findCharacterByName(req: Request, res: Response) {
        const character = await characterService.findCharacterByName(req.params.name);
        return res.json(character);
    }

}

export default new charactersController;
