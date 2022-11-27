import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Video } from '../models/video';
import { generateShortID, isValidID } from '../services/url';

export const viewVideo = async (req: Request, res: Response) => {
    const videoId = req.params.videoId;
    if (!isValidID(videoId))
        return res.status(403).json({ message: 'Video id is not valid' });
    const video = await Video.findOne({ url: videoId });
    if (!video) return res.status(404).json({ message: 'Video not found' });
    video.views++;
    await video.save();

    res.status(200).json({ message: 'Video watched' });
};
export const uploadVideo = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    if (!title) return res.status(403).json({ message: 'Title is required' });
    const video = await Video.create({
        title,
        description,
        url: generateShortID(),
        channel: new mongoose.Types.ObjectId(req.user?._id),
    });
    return res.status(201).json(video);
};

export const editVideo = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    req.video.title = title || req.video.title;
    req.video.description = description || req.video.description;
    await req.video.save();
    return res.status(200).json(req.video);
};

export const deleteVideo = async (req: Request, res: Response) => {
    await req.video.remove();
    return res.status(200).json({ message: 'Video deleted' });
};

export const likeVideo = async (req: Request, res: Response) => {
    const { video, user } = req;
    if (video.likes.includes(user?._id)) {
        return res
            .status(400)
            .json({ message: 'You are already liked the video' });
    }

    const ifDisliked = video.dislikes.indexOf(user?._id);
    if (ifDisliked !== -1) {
        video.likes.splice(ifDisliked, 1);
    }
    video.likes.push(user?._id);
    await video.save();
    return res.status(200).json(video);
};
export const dislikeVideo = async (req: Request, res: Response) => {
    const { video, user } = req;
    if (video.dislikes.includes(user?._id)) {
        return res
            .status(400)
            .json({ message: 'You are already disliked the video' });
    }

    const ifLiked = video.likes.indexOf(user?._id);
    if (ifLiked !== -1) {
        video.likes.splice(ifLiked, 1);
    }
    video.dislikes.push(user?._id);
    await video.save();
    return res.status(200).json(video);
};
