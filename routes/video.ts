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

// /video route
app.route('/:videoId').get(viewVideo).patch(editVideo).delete(deleteVideo);
app.post('/upload', uploadVideo);
app.route('/:videoId/like').post(likeVideo).delete(dislikeVideo);

export { app as videoRoute };
