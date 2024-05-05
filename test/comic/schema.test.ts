import comicsSchema from '../../src/schema/comics.schema';
import { comicsType } from '../../src/type/comics.type';

describe('comicsSchema', () => {
    it('should define a Mongoose schema for comics', () => {
        expect(comicsSchema).toBeDefined();
    });

    it('should have all required fields', () => {
        const requiredFields = ['id', 'title', 'isbn', 'upc', 'format', 'pageCount', 'textObjects', 'resourceURI', 'urls', 'series', 'dates', 'prices', 'thumbnail', 'images', 'creators'];

        requiredFields.forEach(field => {
            const schemaPaths = comicsSchema.schema.paths;
            expect(schemaPaths[field]).toBeDefined();
        });
    });

    it('should have correct data types for fields', () => {
        const fieldDataTypes: Record<string, any> = {
            id: Number,
            title: String,
            isbn: String,
            upc: String,
            format: String,
            pageCount: Number,
            textObjects: {
                language: String,
                text: String
            },
            resourceURI: String,
            urls: {
                url: String
            },
            series: {
                resourceURI: String,
                name: String,
            },
            dates: {
                date: String
            },
            prices: {
                price: Number
            },
            thumbnail: {
                path: String,
                extension: String,
            },
            images: {
                path: String,
                extension: String
            },
            creators: {
                available: Number,
                collectionURI: String,
                items: [{
                    resourceURI: String,
                    name: String,
                }],
                returned: Number
            }
        };

        Object.entries(fieldDataTypes).forEach(([field, type]) => {
            const schemaPaths = comicsSchema.schema.paths;
            expect(schemaPaths[field].instance).toEqual(type);
        });
    });
});
