import comicsSchema from "../schema/comics.schema";
import { comicsType } from "../type/comics.type";

class comicsService {

    async findAll() {
        const comicFound = await comicsSchema.find()
        return comicFound;
    }

    async findById(id: string) {
        const comicFound = await comicsSchema.findById(id)
        return comicFound;
    }

    async create(quadrinho: comicsType) {
        const comicCreated = await comicsSchema.create(quadrinho)
        return comicCreated;
    }

    async findAllBanco() {
        const comicFound = await comicsSchema.find()
        return comicFound;
    }

    async findByIdBanco(id: string) {
        const comicFound = await comicsSchema.findOne({ id })
        return comicFound;
    }

    async update(comicId: string, comic: comicsType) {
        try {
            const comicUpdated = await comicsSchema.findOneAndUpdate({ id: comicId },
                {
                    title: comic.title,
                    isbn: comic.isbn,
                    upc: comic.upc,
                    format: comic.format,
                    pageCount: comic.pageCount,
                    textObjects: comic.textObjects,
                    resourceURI: comic.resourceURI,
                    urls: comic.urls,
                    series: comic.series,
                    dates: comic.dates,
                    prices: comic.prices,
                    thumbnail: comic.thumbnail,
                    images: comic.images,
                    creators: comic.creators,
                }, { new: true });


            if (!comicUpdated) {
                throw new Error("Quadrinho não encontrado");
            }

            return comicUpdated;
        } catch (error: any) {
            throw new Error(`Erro ao atualizar quadrinho: ${error.message}`);
        }
    }

    async delete(id: string) {
        try {
            await comicsSchema.findByIdAndDelete(id)
            return "Quadrinho Removido"
        } catch (error) {
            throw new Error(`Erro ao remover quadrinho: ${error}`)
        }
    }

    async findComicByName(title: any) {
        const foundComic = await comicsSchema.find({ title: { $regex: title, $options: 'i' } });
        return foundComic;
    }

    async findComicsMorethan25Pages() {
        const findedComics = await comicsSchema.find({ pageCount: { $gt: 35 } });
        return findedComics;
    }
}

export default new comicsService;