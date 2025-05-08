import { Express, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import { getSwaggerDocs, getSwaggerTags } from './helpers/swaggerDocsHelper';
import { SwaggerRequest } from './interfaces/SwaggerInterfaces';

export const setupSwaggerAggregator = async (app: Express): Promise<void> => {
    app.use(
        '/api/docs',
        swaggerUi.serve,
        async (req: SwaggerRequest, res: Response, next: NextFunction) => {
            const swaggerDocs = await getSwaggerDocs();
            const combinedTags = getSwaggerTags(swaggerDocs);

            req.swaggerDoc = {
                openapi: '3.0.0',
                info: {
                    title: 'Combined API Docs',
                    version: '1.0.0',
                    description:
                        'The combined documentation from microservices.',
                },
                servers: [
                    {
                        url: process.env.AUTHENTICATION_SERVICE as string,
                        description: 'Authentication service server',
                    },
                    {
                        url: process.env.PRODUCT_SERVICE as string,
                        description: 'Product service server',
                    },
                    {
                        url: process.env.ORDER_SERVICE as string,
                        description: 'Order service server',
                    },
                ],
                paths: Object.assign(
                    {},
                    ...Object.values(swaggerDocs).map((doc) => doc.paths),
                ),
                tags: combinedTags,
            };
            swaggerUi.setup(req.swaggerDoc)(req, res, next);
        },
    );
};
