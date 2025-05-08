import { Response } from 'express';
import { INTERNAL_ERROR } from '../constants/statusCode';

export const handleError = (res: Response, error: any, message: string) => {
    console.error(error);
    res.status(INTERNAL_ERROR).json({ error: message });
};
