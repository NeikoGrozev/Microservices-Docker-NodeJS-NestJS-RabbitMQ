import { UnauthorizedException } from '@nestjs/common';
import httpClient from '../modules/httpClient';

export const getSessionResponse = async (authHeader: string) => {
    if (!authHeader) {
        throw new UnauthorizedException('No authorization header.');
    }

    const [_, tokenData] = authHeader.split(' ');
    const decodedData = Buffer.from(tokenData, 'base64').toString('utf-8');
    const [username, password] = decodedData.split(':');

    return await httpClient.post(
        `${process.env.AUTH_API_URL}/auth/user-verification`,
        {
            username,
            password,
        },
    );
};
