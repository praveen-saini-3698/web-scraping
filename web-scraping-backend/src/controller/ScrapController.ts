import { Router } from "express";
import { ScrapService } from "../service";
import { validationMiddleware } from "../validator";

const ScrapController = Router();
const scrapService = new ScrapService();

ScrapController.get('', scrapService.scrapSite);
ScrapController.post('', validationMiddleware, scrapService.postScrap);
ScrapController.get('/all', scrapService.getAllSites);

export default ScrapController;