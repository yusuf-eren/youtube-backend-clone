import mongoose, { Schema } from 'mongoose';

const VideoSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    channel: { type: mongoose.Schema.Types.ObjectId, required: true },
    url: { type: String, required: true },
    S3_url: { type: String, required: false },
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
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: false,
        },
    ],
    dislikes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: false,
        },
    ],
    views: { type: Number, default: 0, required: false },
});

export const Video = mongoose.model('Video', VideoSchema);
