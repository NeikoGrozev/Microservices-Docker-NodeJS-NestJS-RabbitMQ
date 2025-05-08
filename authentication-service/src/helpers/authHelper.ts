import httpClient from '../modules/httpClient';
import { Configuration, FrontendApi } from '@ory/client';

const ory = new FrontendApi(
    new Configuration({
        basePath: process.env.ORY_API_URL,
        baseOptions: { withCredentials: true },
    }),
);

export const getFlowId = async (type: string) => {
    const response = await httpClient.get(
        `${process.env.ORY_API_URL}/self-service/${type}/api`,
    );
    const responseJson = (await response.json()) as { id: string };

    return responseJson.id;
};

export const login = async (
    flowId: string,
    username: string,
    password: string,
) => {
    const response = await httpClient.post(
        `${process.env.ORY_API_URL}/self-service/login?flow=${flowId}`,
        {
            method: 'password',
            identifier: username,
            password,
        },
    );

    return await response.json();
};

export const registration = async (
    flowId: string,
    username: string,
    password: string,
) => {
    const response = await httpClient.post(
        `${process.env.ORY_API_URL}/self-service/registration?flow=${flowId}`,
        {
            method: 'password',
            traits: { email: username },
            password,
        },
    );

    return await response.json();
};

export const setToken = async (token: string) => {
    return await ory.toSession({
        xSessionToken: token,
    });
};
