import { Schema } from 'mongoose';
import creatorSchema from '../../src/schema/creators.schema';

describe('creatorsSchema', () => {
    it('deve definir um esquema mongoose para criadores', () => {
        expect(creatorSchema).toBeInstanceOf(Schema);
    });

    it('deve conter os campos esperados no schema', () => {
        const schemaFields = creatorSchema.schema.obj;
        const expectedFields = [
            'id',
            'fullName',
            'thumbnail',
            'comics',
            'urls',
            'createdAt',
            'updatedAt'
        ];

        expectedFields.forEach((field) => {
            expect(schemaFields[field]).toBeDefined();
        });
    });

    it('o campo "id" deve ser do tipo Number', () => {
        const idField = creatorSchema.schema.paths['id'];
        expect(idField).toBeDefined();
        expect(idField.instance).toBe('Number');
    });

    it('o campo "fullName" deve ser do tipo String', () => {
        const fullNameField = creatorSchema.schema.paths['fullName'];
        expect(fullNameField).toBeDefined();
        expect(fullNameField.instance).toBe('String');
    });

    it('o campo "thumbnail" deve ser um objeto com os campos "path" e "extension"', () => {
        const thumbnailField = creatorSchema.schema.paths['thumbnail'];
        expect(thumbnailField).toBeDefined();
        expect(thumbnailField.instance).toBe('Object');

        const pathField = creatorSchema.schema.paths['thumbnail'].schema.paths['path'];
        expect(pathField).toBeDefined();
        expect(pathField.instance).toBe('String');

        const extensionField = creatorSchema.schema.paths['thumbnail'].schema.paths['extension'];
        expect(extensionField).toBeDefined();
        expect(extensionField.instance).toBe('String');
    });

    it('o campo "comics" deve ser um objeto com os campos "available", "collectionURI", "items", e "returned"', () => {
        const comicsField = creatorSchema.schema.paths['comics'];
        expect(comicsField).toBeDefined();
        expect(comicsField.instance).toBe('Object');

        const availableField = creatorSchema.schema.paths['comics'].schema.paths['available'];
        expect(availableField).toBeDefined();
        expect(availableField.instance).toBe('Number');

        const collectionURIField = creatorSchema.schema.paths['comics'].schema.paths['collectionURI'];
        expect(collectionURIField).toBeDefined();
        expect(collectionURIField.instance).toBe('String');

        const itemsField = creatorSchema.schema.paths['comics'].schema.paths['items'];
        expect(itemsField).toBeDefined();
        expect(itemsField.instance).toBeInstanceOf(Array);

        const returnedField = creatorSchema.schema.paths['comics'].schema.paths['returned'];
        expect(returnedField).toBeDefined();
        expect(returnedField.instance).toBe('Number');
    });

    it('o campo "urls" deve ser um array de objetos com o campo "url"', () => {
        const urlsField = creatorSchema.schema.paths['urls'];
        expect(urlsField).toBeDefined();
        expect(urlsField.instance).toBeInstanceOf(Array);

        const urlField = creatorSchema.schema.paths['urls'].schema.paths['url'];
        expect(urlField).toBeDefined();
        expect(urlField.instance).toBe('String');
    });

    it('o campo "createdAt" deve ser do tipo Date', () => {
        const createdAtField = creatorSchema.schema.paths['createdAt'];
        expect(createdAtField).toBeDefined();
        expect(createdAtField.instance).toBe('Date');
    });

    it('o campo "updatedAt" deve ser do tipo Date', () => {
        const updatedAtField = creatorSchema.schema.paths['updatedAt'];
        expect(updatedAtField).toBeDefined();
        expect(updatedAtField.instance).toBe('Date');
    });
});
