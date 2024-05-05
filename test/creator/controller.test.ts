import axios from 'axios';
import { Request, Response } from 'express';
import creatorController from '../../src/controller/creators.controller';

jest.mock('axios');

describe('creatorController', () => {
    describe('findAll', () => {
        it('deve retornar todos os criadores', async () => {
            const mockCreators = [{ fullName: 'Creator 1' }, { fullName: 'Creator 2' }];
            const mockResponseFindAll = { json: jest.fn() } as unknown as Response;
            const mockRequest = {} as Request;

            const mockResponseData = { data: { data: { results: mockCreators } } };
            (axios.get as jest.Mock).mockResolvedValue(mockResponseData);

            await creatorController.findAll(mockRequest, mockResponseFindAll);

            expect(mockResponseFindAll.json).toHaveBeenCalledWith(mockCreators);
        });

    });

    describe('findById', () => {
        it('deve retornar criador pelo id', async () => {
            const mockCreator = { fullName: 'Creator 1' };
            const mockResponseFindById = { json: jest.fn() } as unknown as Response;
            const mockRequest = { params: { id: '123' } } as unknown as Request;

            const mockResponseData = { data: { data: { results: [mockCreator] } } };
            (axios.get as jest.Mock).mockResolvedValue(mockResponseData);

            await creatorController.findById(mockRequest as Request, mockResponseFindById);

            expect(mockResponseFindById.json).toHaveBeenCalledWith(mockCreator);
        });

        it('deve lidar com erros ao buscar criador pelo ID', async () => {
            const mockResponseError = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
            const mockRequest = { params: { id: '123' } } as unknown as Request;

            (axios.get as jest.Mock).mockRejectedValue(new Error('API Error'));

            await creatorController.findById(mockRequest as Request, mockResponseError);

            expect(mockResponseError.status).toHaveBeenCalledWith(500);
            expect(mockResponseError.json).toHaveBeenCalledWith({ error: 'Erro ao buscar criador por ID' });
        });
    });

    // Mais testes podem ser adicionados aqui para os outros métodos do controller

});
