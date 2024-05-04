export interface creatorsType {
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
        items: {
            resourceURI: String,
            name: String,
        },
        returned: Number
    },
    imgUrl: String
} 