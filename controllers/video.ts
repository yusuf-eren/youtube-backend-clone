import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Video } from '../models/video';

export const uploadVideo = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    if (!title) return res.status(403).json({ message: 'Title is required' });
    const video = await Video.create({
        title,
        description,
    });
    res.status(201).send(video);
};
export const editVideo = async (req: Request, res: Response) => {};
export const deleteVideo = async (req: Request, res: Response) => {};

export const likeVideo = async (req: Request, res: Response) => {};
export const dislikeVideo = async (req: Request, res: Response) => {};
