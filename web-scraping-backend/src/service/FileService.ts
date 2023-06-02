import { Request, Response } from "express";
import { ResponseHandler } from './../utility';
import { FileModel } from "../model";
import { config } from "dotenv";
import path from "path";
import Vibrant from "node-vibrant";
config();

const responseHandler: ResponseHandler = new ResponseHandler();
const pathResolver = (inp: string) => path.resolve(inp);

export class FileService {

    async uploadFile(request: Request, response: Response) {
        try {
            const { originalname, mimetype, path, } = request.file as Express.Multer.File;
            const newFile = new FileModel({
                originalName: originalname,
                mimeType: mimetype,
                filePath: path,
            });
            const doc = await newFile.save();
            const fileUrl = `http://${process.env.APP_HOST}:${process.env.APP_PORT}/file/${doc.id}`;
            const filePath = pathResolver(doc.filePath as string);
            const colors = await Vibrant.from(filePath).getPalette();
            response.setHeader('colors', JSON.stringify(colors));
            return responseHandler.sendResponse(response, {
                code: 201,
                data: { fileUrl, colors },
                message: "File saved successfully"
            });
        } catch (error: any) {
            return responseHandler.sendError(response, error);
        }
    }

    async getFile(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const file = await FileModel.findById(id);
            if (!file) throw new Error('File not found.');
            response.set('Content-Type', file.mimeType);
            const filePath = pathResolver(file.filePath as string);
            return response.sendFile(filePath);
        } catch (error: any) {
            return responseHandler.sendError(response, error);
        }
    }
}