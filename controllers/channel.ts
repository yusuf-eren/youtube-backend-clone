import { Request, Response } from 'express';
import mongoose, { Error } from 'mongoose';
import { User } from '../models/user';

export const subscribeChannel = async (req: Request, res: Response) => {
    const channelID = req.params.channelId.toLowerCase();
    if (channelID.length !== 24)
        return res.status(400).json({ message: 'Object Id is not valid' });

    const channel = await User.findById({ _id: req.params.channelId });
    const userID = new mongoose.Types.ObjectId(req.user?._id);
    if (!channel) return res.status(404).send('Channel Not Found');
    if (channel.subscribers.includes(userID)) {
        return res.status(400).send('You are Already Subscribed');
    }

    // Push to subscribers of the Channel
    channel.subscribers.push(userID);
    channel.save();

    // Push to subscribed Channels of the User
    const user = await User.findById({ _id: req.user?._id });
    user?.subscribedChannels.push(channel._id);
    user?.save();

    res.status(200).send({ message: 'subscribed' });
};
export const unsubscribeChannel = async (req: Request, res: Response) => {
    const channelID = req.params.channelId.toLowerCase();
    if (channelID.length !== 24)
        return res.status(400).json({ message: 'Object Id is not valid' });

    const channel = await User.findById({ _id: channelID });
    const userID = new mongoose.Types.ObjectId(req.user?._id);

    if (!channel) return res.status(404).send('Channel Not Found');
    if (!channel.subscribers.includes(userID)) {
        return res
            .status(400)
            .send('You are Already not Subscribed To the Channel');
    }
    User.findOneAndUpdate(
        { _id: req.params.channelId },
        { $pull: { subscribers: req.user?._id } },
        function (error: Error) {
            if (error) {
                return res.status(400).json({ error });
            }
        }
    );
    User.findOneAndUpdate(
        { _id: userID },
        { $pull: { subscribedChannels: req.params.channelId } },
        function (error: Error) {
            if (error) {
                return res.status(400).json({ error });
            }
        }
    );
    res.status(200).send({ message: 'unsubscribed' });
};
