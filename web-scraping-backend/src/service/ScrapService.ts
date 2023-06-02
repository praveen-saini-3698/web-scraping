import { Request, Response } from "express";
import { ResponseHandler } from './../utility';
import axios from "axios";
import cheerio from "cheerio";
import Vibrant from 'node-vibrant';
import { ScrapModel } from "../model";
import { CreatScrapDTO } from "../dto";

const responseHandler: ResponseHandler = new ResponseHandler();

export class ScrapService {

    async scrapSite(request: Request, response: Response) {
        try {
            const { query } = request;

            const data = await axios(query.url as string);
            const $ = await cheerio.load(data.data);
            const logoSrc = $('img').first().attr();
            let logo = logoSrc['data-srcset'] ? logoSrc['data-srcset'].split(",").map(ele => ele.trim().split(" ")[0])[0] : logoSrc['src'];
            let logoColors = null;
            logo = logo.match(/https/) ? logo : (query.url as string).concat(logo.startsWith("/") ? "" : "/").concat(logo);
            try {
                const colorPalette = await Vibrant.from(logo).getPalette();
                const colors = Object.keys(colorPalette).map(palette => colorPalette[palette]?.rgb);
                logoColors = colors;
            } catch (error) { }
            const typography = $('body').css('font-family');
            const about = $('meta[name="description"]').attr('content');
            const name = new URL(query.url as string).hostname;
            const title = $('title').text();
            const keywords = $('meta[name="keywords"]').attr('content');
            const record: Record<string, any> = { name, about, keywords, title, typography, logo, colors: logoColors };
            return responseHandler.sendResponse(response, {
                code: 201,
                data: record,
                success: true,
                timestamp: new Date(),
                message: "data fetched successfully"
            });
        } catch (error: any) {
            return responseHandler.sendError(response, error);
        }
    }

    async postScrap(request: Request, response: Response) {
        try {
            const params: CreatScrapDTO = request.body;
            const doc = await new ScrapModel(params).save();
            return responseHandler.sendResponse(response, {
                data: doc
            });
        } catch (error: any) {
            return responseHandler.sendError(response, error);
        }
    }

    async getAllSites(_request: Request, response: Response) {
        try {
            const doc = (await ScrapModel.find()).map(record => ({
                id: record.id,
                url: record.url,
                name: record.name,
                title: record.title,
                typography: record.typography,
                logo: record.logo,
                logoColors: [],
                keywords: record.keywords,
                description: record.description
            }));
            return responseHandler.sendResponse(response, {
                data: doc
            });
        } catch (error: any) {
            return responseHandler.sendError(response, error);
        }
    }
}