import express, { Request, Response, Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../config/swaggerConfig';

const router: Router = express.Router();

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

router.get('/docs-json', async (req: Request, res: Response) => {
    res.json(swaggerSpec);
});

export default router;
