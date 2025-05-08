import { Session } from '@ory/client';

declare global {
    namespace Express {
        interface Request {
            identity?: Session;
        }
    }
}

export {};
