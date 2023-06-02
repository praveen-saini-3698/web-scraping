import { Schema, model } from "mongoose";

const fileModelSchema = new Schema({
    originalName: String,
    mimeType: String,
    filePath: String,
});

export const FileModel = model('File', fileModelSchema);