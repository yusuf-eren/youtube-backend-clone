import express from 'express';
import { authRoute } from './routes/auth';
const app = express();

app.use(express.json());

app.use('/auth', authRoute);
