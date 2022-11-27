import { Request, Response, NextFunction } from 'express';
import { Video } from '../models/video';

interface VideoPayload {
    _id: string;
    title: string;
    channel: string;
    url: string;
    likes: any[];
    comments: any[];
}

declare global {
    namespace Express {
        interface Request {
            video?: any;
        }
    }
}

export const checkVideoAndUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const videoId = req.params.videoId;
        const video = await Video.findOne({ url: videoId });
        if (!video) return res.status(404).json({ message: 'Video not found' });
        if (video.channel._id.toString() !== req.user?._id)
            return res.status(401).json({ message: 'You are not authorized' });
        req.video = video;
    } catch (error) {
        return res.status(400).send(error);
    }

    next();
};

export const checkVideo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const videoId = req.params.videoId;
        const video = await Video.findOne({ url: videoId });
        if (!video) return res.status(404).json({ message: 'Video not found' });
        req.video = video;
    } catch (error) {
        return res.status(400).send(error);
    }

    next();
};