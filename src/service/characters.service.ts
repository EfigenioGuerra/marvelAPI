import charactersSchema from "../schema/characters.schema";
import {charactersType} from "../type/characters.type";

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

async findByIdBanco(id: string){
    const findedPersonagem = await charactersSchema.findById(id)
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
            throw new Error(`Erro ao atualizar personagem: ${ error.message }`);
        }
    }

    async delete(id: string) {
        try {
            await charactersSchema.findByIdAndDelete(id)
            return 'Personagem Removido';
        } catch (error) {
            throw new Error(`Erro na remoção personagem: ${ error }`)
        }
    }
}

export default new CharactersService