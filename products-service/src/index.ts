import express, { Request, Response } from 'express';
import productsController from './controllers/productsController';
import swaggerController from './controllers/swaggerController';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { errorHandler } from './middlewares/errorHandling';
import passport from 'passport';
import session from 'express-session';
import { connectRabbitMQ } from './services/rabbitmq';

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/products', productsController);
app.use('/api', swaggerController);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: `${process.env.SESSION_SECRET_KEY}`,
        resave: false,
        saveUninitialized: false,
    }),
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!');
});

app.use(errorHandler);

connectRabbitMQ();

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
