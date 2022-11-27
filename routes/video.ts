import express from 'express';
import {
    likeVideo,
    dislikeVideo,
    uploadVideo,
    editVideo,
    deleteVideo,
    viewVideo,
} from '../controllers/video';
import { checkVideo, checkVideoAndUser } from '../middlewares/video';
const app = express.Router();

// /video route
app.route('/:videoId')
    .get(viewVideo)
    .patch(checkVideoAndUser, editVideo)
    .delete(checkVideoAndUser, deleteVideo);
app.post('/upload', uploadVideo);
app.route('/:videoId/like').get(checkVideo, likeVideo);
app.route('/:videoId/dislike').get(checkVideo, dislikeVideo);

export { app as videoRoute };
