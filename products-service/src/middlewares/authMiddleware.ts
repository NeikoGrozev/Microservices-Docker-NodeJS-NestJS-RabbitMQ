import { Request, Response, NextFunction } from 'express';
import { INTERNAL_ERROR, OK, UNAUTHORIZED } from '../constants/statusCode';
import { getSessionResponse } from '../helpers/authHelper';

export const authenticateMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const authHeader = req.headers.authorization || '';
        const response = await getSessionResponse(authHeader);

        if (response.status !== OK) {
            throw new Error('No session token received from login.');
        }

        const session = await response.json();
        req.identity = session;
        next();
    } catch (error) {
        if (error instanceof Error) {
            res.status(UNAUTHORIZED).json({ error: error.message });
        } else {
            res.status(INTERNAL_ERROR).json({ error: 'Authentication failed' });
        }
    }
};
