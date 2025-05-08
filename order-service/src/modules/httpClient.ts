interface RequestOptions {
    body?: string;
    headers?: { [key: string]: string };
}

const buildOptions = (data?: any, additionalHeaders?: any) => {
    const options: RequestOptions = {};

    if (data) {
        options.body = JSON.stringify(data);
    }

    options.headers = {
        'Content-Type': 'application/json',
        ...additionalHeaders,
    };

    return options;
};

const request = async (
    method: string,
    url: string,
    data?: any,
    additionalHeaders?: any,
) => {
    return await fetch(url, {
        method,
        ...buildOptions(data, additionalHeaders),
    });
};

const get = (url: string) => {
    return request('GET', url);
};

const post = (url: string, data: any, additionalHeaders?: any) => {
    return request('POST', url, data, additionalHeaders);
};

const put = (url: string, data: any) => {
    return request('PUT', url, data);
};

const remove = (url: string) => {
    return request('DELETE', url);
};

const httpClient = { get, post, put, remove };

export default httpClient;
