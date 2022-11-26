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
    });
    res.status(201).send(video);
};
export const editVideo = async (req: Request, res: Response) => {};
export const deleteVideo = async (req: Request, res: Response) => {};

export const likeVideo = async (req: Request, res: Response) => {};
export const dislikeVideo = async (req: Request, res: Response) => {};
