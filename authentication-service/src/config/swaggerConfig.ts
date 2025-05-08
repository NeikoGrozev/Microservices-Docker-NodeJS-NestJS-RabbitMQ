import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Authentication API',
            version: '1.0.0',
            description:
                'API documentation for authentication services, including login, registration, and user verification.',
        },
        tags: [
            {
                name: 'Authentication',
                description:
                    'Endpoints for user authentication, login, registration, and verification.',
            },
        ],
    },
    apis: ['./src/controllers/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
