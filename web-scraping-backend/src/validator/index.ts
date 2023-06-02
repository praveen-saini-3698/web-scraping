import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { CreatScrapDTO } from '../dto';

export const validationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dto = plainToClass(CreatScrapDTO, req.body);
        const errors = await validate(dto);
        if (errors.length > 0) {
            const errorMessages = errors.map(error => Object.values(error.constraints as Record<string, any>));
            return res.status(400).json({ errors: errorMessages });
        }
        req.body = dto;
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};