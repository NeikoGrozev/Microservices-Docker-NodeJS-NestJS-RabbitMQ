import { SwaggerDoc } from '../interfaces/SwaggerInterfaces';

export const getSwaggerDocs = async () => {
    try {
        const services = [
            {
                name: 'authentication-service',
                url: `http://authentication-service:5000/api/docs-json`,
            },
            {
                name: 'product-service',
                url: 'http://product-service:3000/api/docs-json',
            },
            {
                name: 'order-service',
                url: 'http://order-service:5010/api/docs-json',
            },
        ];

        const docs = await Promise.all(
            services.map(async (service) => {
                const res = await fetch(service.url);
                const data = await res.json();
                return { [service.name]: data };
            }),
        );

        return docs.reduce((acc, curr) => ({ ...acc, ...curr }), {});
    } catch (error) {
        console.error('Error fetching swagger docs:', error);
        return {};
    }
};

export const getSwaggerTags = (swaggerDocs: SwaggerDoc) => {
    return Object.values(swaggerDocs)
        .flatMap((doc) => doc.tags || [])
        .reduce<{ name: string; description?: string }[]>((acc, t) => {
            if (!acc.some((tag) => tag.name === t.name)) {
                acc.push(t);
            }
            return acc;
        }, []);
};
