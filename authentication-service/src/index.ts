import express from 'express';
import authController from './controllers/authController';
import swaggerController from './controllers/swaggerController';
import { errorHandler } from './middlewares/errorHandling';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/auth', authController);
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
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
