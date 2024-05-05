import comicsService from '../../src/service/comics.service';
import comicsSchema from '../../src/schema/comics.schema';

jest.mock('../../src/schema/comics.schema');

describe('comicsService', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpar todos os mocks após cada teste
    });

    describe('findAll', () => {
        it('should return all comics', async () => {
            const mockComics = [{ id: 1, title: 'Comic 1' }, { id: 2, title: 'Comic 2' }];
            (comicsSchema.find as jest.Mock).mockResolvedValue(mockComics);

            const result = await comicsService.findAll();

            expect(result).toEqual(mockComics);
        });

        it('should return empty array if no comics found', async () => {
            (comicsSchema.find as jest.Mock).mockResolvedValue([]);

            const result = await comicsService.findAll();

            expect(result).toEqual([]);
        });

        it('should throw an error if comics retrieval fails', async () => {
            const errorMessage = 'Database error';
            (comicsSchema.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await expect(comicsService.findAll()).rejects.toThrow(errorMessage);
        });
    });

    describe('findById', () => {
        it('should return comic by id', async () => {
            const mockComicId = '123';
            const mockComic = { id: 123, title: 'Comic 1' };
            (comicsSchema.findById as jest.Mock).mockResolvedValue(mockComic);

            const result = await comicsService.findById(mockComicId);

            expect(result).toEqual(mockComic);
        });

        it('should return null if comic with given id does not exist', async () => {
            const mockComicId = '123';
            (comicsSchema.findById as jest.Mock).mockResolvedValue(null);

            const result = await comicsService.findById(mockComicId);

            expect(result).toBeNull();
        });

        it('should throw an error if comics retrieval by id fails', async () => {
            const mockComicId = '123';
            const errorMessage = 'Database error';
            (comicsSchema.findById as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await expect(comicsService.findById(mockComicId)).rejects.toThrow(errorMessage);
        });
    });
});