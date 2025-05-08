import express, { Request, Response, Router } from 'express';
import { OK, CREATED, NO_CONTENT, NOT_FOUND } from '../constants/statusCode';
import { handleError } from '../helpers/errorHelper';
import { authenticateMiddleware } from '../middlewares/authMiddleware';
import {
    createProduct,
    deleteProduct,
    deleteProducts,
    getProductById,
    getProducts,
    updateProduct,
} from '../services/prismaService';

const router: Router = express.Router();
router.use(authenticateMiddleware);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of products
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: A list of products
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch products"
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const products = await getProducts();
        res.status(OK).json(products);
    } catch (error) {
        handleError(res, error, 'Failed to fetch products');
    }
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch product"
 */
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await getProductById(id);

        if (product) {
            res.status(OK).json(product);
        } else {
            res.status(NOT_FOUND).json({ error: 'Product not found' });
        }
    } catch (error) {
        handleError(res, error, 'Failed to fetch product');
    }
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Product created successfully
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to create product"
 */
router.post('/', async (req: Request, res: Response) => {
    try {
        const product = await createProduct(req.body);
        res.status(CREATED).json({ id: product.id });
    } catch (error) {
        handleError(res, error, 'Failed to create product');
    }
});

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to update product"
 */
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedProduct = await updateProduct(id, updateData);
        res.status(OK).json(updatedProduct);
    } catch (error) {
        handleError(res, error, 'Failed to update product');
    }
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to delete product"
 */
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteProduct(id);
        res.status(NO_CONTENT).send();
    } catch (error) {
        handleError(res, error, 'Failed to delete product');
    }
});

/**
 * @swagger
 * /products:
 *   delete:
 *     summary: Delete all products
 *     tags:
 *       - Products
 *     responses:
 *       204:
 *         description: All products deleted successfully
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to delete products"
 */
router.delete('/', async (req: Request, res: Response) => {
    try {
        await deleteProducts();
        res.status(NO_CONTENT).send();
    } catch (error) {
        handleError(res, error, 'Failed to delete products');
    }
});

export default router;
