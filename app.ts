import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { checkUser } from './middlewares/auth';
import { authRoute } from './routes/auth';
import { channelRoute } from './routes/channel';
import { videoRoute } from './routes/video';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoute);
app.use('/channel', checkUser, channelRoute);
app.use('/video', videoRoute);
// await Video.create({
//     title: "Zort",
//     likes: new mongoose.Types.ObjectId("63822f369ce2229f4647066b"),
//     comments: {
//         comment: "Heloo",
//         userId: new mongoose.Types.ObjectId("63822f369ce2229f4647066b")
//     }
// })

app.all('*', async (req: Request, res: Response) => {
    return res.sendStatus(404);
});

export { app };
