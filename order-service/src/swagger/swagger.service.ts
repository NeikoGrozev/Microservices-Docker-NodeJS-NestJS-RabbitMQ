import { Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { OpenAPIObject } from '@nestjs/swagger';

@Injectable()
export class SwaggerService {
    private swaggerDocument: OpenAPIObject | null;

    generateSwaggerDocument(app: INestApplication) {
        const config = new DocumentBuilder()
            .setTitle('Orders API')
            .setDescription(
                'API documentation for managing orders, including CRUD operations',
            )
            .setVersion('1.0')
            .addTag(
                'Orders',
                'Endpoints for creating, updating, deleting, and retrieving orders.',
            )
            .build();

        this.swaggerDocument = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api/docs', app, this.swaggerDocument, {
            jsonDocumentUrl: 'api/docs-json',
        });
    }

    getDocument() {
        return this.swaggerDocument;
    }
}
