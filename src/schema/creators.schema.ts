import { Schema, model } from "mongoose";

const creatorSchema = new Schema({
    id: Number,
    fullName: String,
    thumbnail: {
        path: String,
        extension: String,
    },
    comics: {
        available: Number,
        collectionURI: String,
        items: [{
            resourceURI: String,
            name: String,
        }],
        returned: Number
    }, 
    urls: [{
        url: String
    }],
}, { timestamps: true });

export default model("Creator", creatorSchema);