import express from 'express';
import { likeVideo, dislikeVideo } from '../controllers/video'
const app = express.Router();

app.route('/:videoId/like').post(likeVideo).delete(dislikeVideo);

export { app as videoRoute };
