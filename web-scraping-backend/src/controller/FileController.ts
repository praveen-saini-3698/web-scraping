import { Router } from "express";
import { UploadFilter } from "../config";
import { FileService } from "../service";

const FileController = Router();
const fileService = new FileService();

FileController.post('/upload', UploadFilter, fileService.uploadFile);
FileController.get('/:id', fileService.getFile)

export default FileController;