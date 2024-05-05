import charactersSchema from "../schema/characters.schema";
import comicsSchema from "../schema/comics.schema";
import { charactersType } from "../type/characters.type";

class CharactersService {
    async findAll() {
        const findedPersonagem = await charactersSchema.find()
        return findedPersonagem;
    }

    async findById(id: string) {
        const findedPersonagem = await charactersSchema.findById(id)
        return findedPersonagem;
    }

    /*----------------------------------------------------------------------*/

    async findByIdBanco(id: string) {
        const findedPersonagem = await charactersSchema.findOne({ id })
        return findedPersonagem
    }

    async create(character: charactersType) {
        const characterCreated = await charactersSchema.create(character)
        return characterCreated;
    }

    async update(characterId: string, character: charactersType) {
        try {
            const characterUpdated = await charactersSchema.findOneAndUpdate(
                { id: characterId },
                {
                    name: character.name,
                    description: character.description,
                    thumbnail: character.thumbnail,
                    resourceURI: character.resourceURI,
                    comics: character.comics,
                    imgUrl: character.imgUrl
                },
                { new: true }
            );

            return characterUpdated;
        } catch (error: any) {
            throw new Error(`Erro ao atualizar personagem: ${error.message}`);
        }
    }

    async delete(id: string) {
        try {
            await charactersSchema.findByIdAndDelete(id)
            return 'Personagem Removido'
        } catch (error) {
            throw new Error(`Erro na remoção personagem: ${error}`)
        }
    }

    async findCharactersWithComicsAbove1000() {
        try {
            const charactersWithComicsAbove1000 = await comicsSchema.aggregate([
                {
                    $match: { available: { $gt: 1000 } }
                },
                {
                    $group: { _id: "$characterId" }
                }
            ]);

            const charactersDetails = await charactersSchema.find({ _id: { $in: charactersWithComicsAbove1000 } });

            return charactersDetails;
        } catch (error) {
            throw new Error('Failed to find characters with comics above 1000');
        }
    }

    async findCharacterByName(name: any) {
        const foundCharacter = await charactersSchema.findOne({ name: { $regex: name, $options: 'i' } });
        return foundCharacter;
    }

}

export default new CharactersService