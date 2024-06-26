import { Schema, model } from "mongoose";

const charactersSchema = new Schema({
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

}, { timestamps: true });

export default model("Characters", charactersSchema);