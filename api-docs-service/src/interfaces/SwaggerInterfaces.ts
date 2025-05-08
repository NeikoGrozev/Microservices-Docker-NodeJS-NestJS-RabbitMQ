import { Request } from 'express';

export interface SwaggerDocument {
    openapi: string;
    info: { title: string; version: string; description: string };
    paths: Record<string, any>;
    servers: { url: string; description: string }[];
    tags: Record<string, any>;
}

export interface SwaggerRequest extends Request {
    swaggerDoc?: SwaggerDocument;
}

export interface SwaggerDoc {
    tags?: Record<string, any>;
}
