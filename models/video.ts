import mongoose, { Schema } from 'mongoose';

const VideoSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    url: { type: String, required: false },
    comments: [
        {
            comment: { type: String, required: false },
            user: {
                type: mongoose.Types.ObjectId,
                required: false,
                ref: 'User',
            },
        },
    ],
    likes: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                ref: 'User',
                required: false,
            },
        },
    ],
    views: { type: Number, default: 0, required: false },
});

export const Video = mongoose.model('Video', VideoSchema);
