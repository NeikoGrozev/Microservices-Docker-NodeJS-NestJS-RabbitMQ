import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Product API',
            version: '1.0.0',
            description:
                'API documentation for managing products, including CRUD operations.',
        },
        tags: [
            {
                name: 'Products',
                description:
                    'Endpoints for creating, updating, deleting, and get products.',
            },
        ],
    },
    apis: ['./src/controllers/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
