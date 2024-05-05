import { Schema } from 'mongoose';
import charactersSchema from '../../src/schema/characters.schema';

describe('charactersSchema', () => {
    it('deve definir um esquema mangusto para personagens', () => {
        expect(charactersSchema).toBeInstanceOf(Schema);
    });
}); 