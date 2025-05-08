import { Request, Response } from 'express';
import { INTERNAL_ERROR } from '../constants/statusCode';

export const errorHandler = (err: Error, req: Request, res: Response) => {
    console.error(err);
    res.status(INTERNAL_ERROR).json({
        success: false,
        status: INTERNAL_ERROR,
        message: err.message,
    });
};
