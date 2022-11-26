import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { authRoute } from './routes/auth';
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoute);

app.all('*', async (req: Request, res: Response) => {
    return res.sendStatus(404);
});

export { app };
