import express from 'express';
import {
    likeVideo,
    dislikeVideo,
    uploadVideo,
    editVideo,
    deleteVideo,
    viewVideo,
} from '../controllers/video';
const app = express.Router();

app.get('/:videoId', viewVideo);
app.post('/upload', uploadVideo);
app.patch('/edit', editVideo);
app.delete('/delete', deleteVideo);
app.route('/:videoId/like').post(likeVideo).delete(dislikeVideo);

export { app as videoRoute };
