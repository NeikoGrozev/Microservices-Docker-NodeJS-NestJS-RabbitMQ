import express, { Request, Response, Router } from 'express';
import {
    getFlowId,
    login,
    registration,
    setToken,
} from '../helpers/authHelper';
import {
    CREATED,
    INTERNAL_ERROR,
    NOT_FOUND,
    OK,
} from '../constants/statusCode';

const router: Router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user with a username and password, returning a session token upon success.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securepassword123"
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You have successfully logged in."
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch user login!"
 */
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const flowId = await getFlowId('login');
        const response = await login(flowId, username, password);
        const sessionToken = response?.session_token;

        res.status(OK).json({
            message: 'You have successfully logged in.',
            token: sessionToken,
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(INTERNAL_ERROR).json({
            error: 'Failed to fetch user login!',
        });
    }
});

/**
 * @swagger
 * /register:
 *   post:
 *     summary: User registration
 *     description: Registers a new user with a username and password, returning a session token upon success.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "newuser@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securepassword123"
 *     responses:
 *       201:
 *         description: Successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Registration was successful."
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch user registration!"
 */
router.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const flowId = await getFlowId('registration');
        const response = await registration(flowId, username, password);
        const sessionToken = response?.session_token;

        res.status(CREATED).json({
            message: 'Registration was successful.',
            token: sessionToken,
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(INTERNAL_ERROR).json({
            error: 'Failed to fetch user registration!',
        });
    }
});

/**
 * @swagger
 * /user-verification:
 *   post:
 *     summary: Verify user credentials
 *     description: Authenticates a user and verifies their session token, returning session details.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securepassword123"
 *     responses:
 *       200:
 *         description: User verification successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "4233dbe3-ab36-4d23-bb3e-46f0211817f6"
 *                 active:
 *                   type: boolean
 *                   example: true
 *                 expires_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-28T13:35:13.972526559Z"
 *                 authenticated_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-27T13:35:13.972526559Z"
 *                 authenticator_assurance_level:
 *                   type: string
 *                   example: "aal1"
 *                 authentication_methods:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       method:
 *                         type: string
 *                         example: "password"
 *                       aal:
 *                         type: string
 *                         example: "aal1"
 *                       completed_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-27T13:35:13.972416784Z"
 *                 issued_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-27T13:35:13.972526559Z"
 *                 identity:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "515be325-9c9c-4ad0-b014-b0039553536a"
 *                     schema_id:
 *                       type: string
 *                       example: "default"
 *                     schema_url:
 *                       type: string
 *                       example: "http://kratos:4433/schemas/ZGVmYXVsdA"
 *                     state:
 *                       type: string
 *                       example: "active"
 *                     state_changed_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-20T12:34:16.026488344Z"
 *                     traits:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           example: "test@abv.bg"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-20T12:34:16.031172Z"
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-20T12:34:16.031172Z"
 *                 devices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "aea29139-9f7d-4605-bcde-2757e83ed2ec"
 *                       ip_address:
 *                         type: string
 *                         example: "10.89.0.62:41964"
 *                       user_agent:
 *                         type: string
 *                         example: "node"
 *                       location:
 *                         type: string
 *                         example: ""
 *       404:
 *         description: No session token received
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No session token!"
 */
router.post('/user-verification', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const flowId = await getFlowId('login');
        const response = await login(flowId, username, password);

        if (!response?.session_token) {
            throw new Error('No session token received from login.');
        }
        const session = await setToken(response.session_token);

        res.status(OK).json(session.data);
    } catch (error) {
        console.error('Server error:', error);
        res.status(NOT_FOUND).json({ error: 'No session token!' });
    }
});

export default router;
