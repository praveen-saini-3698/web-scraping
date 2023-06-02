
import { Schema, model } from "mongoose";

const ScrapModelSchema = new Schema({
    url: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    keywords: {
        type: String
    },
    typography: {
        type: Array<String>
    },
    logo: {
        type: String
    },
    logoColors: Array,
    timestamp: {
        type: Date
    }
});

export const ScrapModel = model('ScrapModel', ScrapModelSchema, "scrap-details");