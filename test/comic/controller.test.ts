import axios from 'axios';
import { Request, Response } from 'express';
import comicsController from '../../src/controller/comics.controller';

jest.mock('axios');

describe('comicsController', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpar todos os mocks após cada teste
    });

    describe('findAll', () => {
        it('should return comics from external API', async () => {
            const mockComics = [{ title: 'Comic 1' }, { title: 'Comic 2' }];
            const mockResponse = { data: { data: { results: mockComics } } };
            (axios.get as jest.Mock).mockResolvedValue(mockResponse);

            const mockRequest = {} as unknown as Request;
            const mockResponseJson = jest.fn();
            const mockResponseObject = { json: mockResponseJson } as unknown as Response;

            await comicsController.findAll(mockRequest as Request, mockResponseObject);

            expect(mockResponseJson).toHaveBeenCalledWith(mockComics);
        });
    });

    describe('findById', () => {
        it('should return comic by id from external API', async () => {
            const mockComic = { title: 'Comic 1' };
            const mockResponse = { data: { data: { results: [mockComic] } } };
            (axios.get as jest.Mock).mockResolvedValue(mockResponse);

            const mockRequest = { params: { id: '123' } } as unknown as Request;
            const mockResponseJson = jest.fn();
            const mockResponseObject = { json: mockResponseJson } as unknown as Response;

            await comicsController.findById(mockRequest as Request, mockResponseObject);

            expect(mockResponseJson).toHaveBeenCalledWith(mockComic);
        });

        it('should handle errors when fetching comic by ID from external API', async () => {
            const errorMessage = 'API Error';
            (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

            const mockRequest = { params: { id: '123' } } as unknown as Request;
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            await comicsController.findById(mockRequest as Request, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Erro ao buscar quadrinho por ID' });
        });
    });
});
