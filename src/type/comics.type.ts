export interface comicsType {
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
        availible: Number,
        collectionURI: String,
        items: {
            resourceURI: String,
            name: String,
        },
        returned: Number
    }
}