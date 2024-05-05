export interface charactersType{
    id: String,
    name: String,
    description: String,
    thumbnail: {
        path: String,
        extension: String,
    }, 
    resourceURI: String,
    comics: {
        available: Number,
        collectionURI: String,
        returned: Number
    },
    imgUrl: String
}