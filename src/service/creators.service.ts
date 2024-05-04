import creatorsSchema from "../schema/creators.schema";
import {creatorsType} from "../type/creators.type";

class creatorService {

    async findAll() {
        const findedCreator = await creatorsSchema.find()
        return findedCreator;
    }

    async findById(id: string) {
        const findedCreator = await creatorsSchema.findById(id)
        return findedCreator;
    }

    async create(criador: creatorsType) {
        const createdCriador = await creatorsSchema.create(criador)
        return createdCriador;
    }

    async findByIdBanco(id: string) {
        const findedCreator = await creatorsSchema.findById(id);
        return findedCreator;
    }

    async update(creatorId: string, creator: creatorsType) {
        try {
            const creatorUpdated = await creatorsSchema.findOneAndUpdate(
                { id: creatorId },
                {
                    name: creator.name,
                    description: creator.description,
                    thumbnail: creator.thumbnail,
                    resourceURI: creator.resourceURI,
                    comics: creator.comics,
                    imgUrl: creator.imgUrl
                },
                { new: true }
            );

            if (!creatorUpdated) {
                throw new Error("Criador não encontrado");
            }

            return creatorUpdated;
        } catch (error: any) {
            throw new Error(`Erro ao atualizar criador: ${ error.message }`);
        }
    }

    async delete(id: string) {
        try {
            await creatorsSchema.findByIdAndDelete(id)
            return "Escritor Removido"
        } catch (error) {
            throw new Error(`Erro ao remover criador: ${ error }`)
        }
    }
}

export default new creatorService;
