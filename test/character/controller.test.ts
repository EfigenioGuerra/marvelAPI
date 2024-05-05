import axios from "axios";
import { Request, Response } from "express";
import charactersController from "../../src/controller/characters.controller"

jest.mock('axios');

describe('charactersController', () => {
    describe('findAll', () => {
        it('should handle errors when fetching characters from external API', async () => {
            const mockResponseError = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as unknown as Response;
            const mockRequest = {} as Request;

            (axios.get as jest.Mock).mockRejectedValue(new Error('API Error'));

            await charactersController.findAll(mockRequest, mockResponseError);

            expect(mockResponseError.status).toHaveBeenCalledWith(500);
            expect(mockResponseError.json).toHaveBeenCalledWith({ error: "Erro ao buscar personagens" });
        });
    });


    describe('findById', () => {
        it('should handle errors when fetching character by ID from external API', async () => {
            const mockResponseError = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as unknown as Response;
            const mockRequest = {
                params: { id: '123' },
                get: jest.fn(),
                header: jest.fn(),
                accepts: jest.fn(),
                acceptsCharsets: jest.fn(),
                // Adicione outras propriedades necessárias aqui, se necessário
            } as unknown as Request;

            (axios.get as jest.Mock).mockRejectedValue(new Error('API Error'));

            await charactersController.findById(mockRequest as Request, mockResponseError);

            expect(mockResponseError.status).toHaveBeenCalledWith(500);
            expect(mockResponseError.json).toHaveBeenCalledWith({ error: "Erro ao buscar personagem por ID" });
        });
    });

});
