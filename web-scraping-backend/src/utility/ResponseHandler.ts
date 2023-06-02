import { Response } from "express";
import { ResponseOptions } from "../types";

export class ResponseHandler {

    sendResponse(response: Response, options: ResponseOptions) {
        if (!options.timestamp) options.timestamp = new Date();
        if (!options.code) options.code = 200;
        if (!options.success) options.success = true;
        return response.status(options.code || 200).json(options);
    }

    sendError(response: Response, error: Error) {
        return response.status(500).send(error.stack || error);
    }
}