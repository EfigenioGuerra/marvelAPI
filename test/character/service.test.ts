import charactersSchema from "../../src/schema/characters.schema";
import CharactersService from "../../src/service/characters.service";
import { charactersType } from "../../src/type/characters.type";

jest.mock("../../src/schema/characters.schema");

describe("CharactersService", () => {
    describe("findAll", () => {
        it("deve retornar todos os personagens", async () => {
            const mockCharacters = [{ name: "Character 1" }, { name: "Character 2" }];
            (charactersSchema.find as jest.Mock).mockResolvedValue(mockCharacters);

            const result = await CharactersService.findAll();

            expect(result).toEqual(mockCharacters);
        }); 
    });

    describe("findById", () => {
        it("deve retornar personagem pelo id", async () => {
            const mockCharacter = { name: "Character 1" };
            (charactersSchema.findById as jest.Mock).mockResolvedValue(mockCharacter);

            const result = await CharactersService.findById("123");

            expect(result).toEqual(mockCharacter);
        });
    });

    describe("create", () => {
        it("deve criar um novo personagem", async () => {
            const mockCharacter: charactersType = {
                id: "123",
                name: "New Character",
                description: "Description",
                thumbnail: {
                    path: "path",
                    extension: "jpg"
                },
                resourceURI: "resourceURI",
                comics: {
                    available: 0,
                    collectionURI: "collectionURI",
                    items: {
                        resourceURI: "itemResourceURI",
                        name: "Item Name"
                    },
                    returned: 0
                },
                imgUrl: "imgUrl"
            };

            (charactersSchema.create as jest.Mock).mockResolvedValue(mockCharacter);

            const result = await CharactersService.create(mockCharacter);

            expect(result).toEqual(mockCharacter);
        });
    });
});

describe("update", () => {
    it("deve fazer update em personagem existente", async () => {
        const mockCharacterId = "123";
        const mockUpdatedCharacter: charactersType = {
            id: "123",
            name: "Updated Character",
            description: "Updated Description",
            thumbnail: {
                path: "updatedPath",
                extension: "jpg"
            },
            resourceURI: "updatedResourceURI",
            comics: {
                available: 0,
                collectionURI: "updatedCollectionURI",
                items:{
                    resourceURI: "updatedItemResourceURI",
                    name: "Updated Item Name"
                },
                returned: 0
            },
            imgUrl: "updatedImgUrl"
        };
        (charactersSchema.findOneAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedCharacter);

        const result = await CharactersService.update(mockCharacterId, mockUpdatedCharacter);

        expect(result).toEqual(mockUpdatedCharacter);
    });
});

describe("delete", () => {
    it("deve deletar personagem", async () => {
        const mockCharacterId = "123";
        (charactersSchema.findByIdAndDelete as jest.Mock).mockResolvedValue(undefined);

        const result = await CharactersService.delete(mockCharacterId);

        expect(result).toEqual("Personagem Removido");
    });
});