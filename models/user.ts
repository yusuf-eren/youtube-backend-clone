import mongoose, { Schema } from 'mongoose';
import { Password } from '../services/password';

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    subscribers: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    ],
    subscribedChannels: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    ],
    videos: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: false },
    ],
});

UserSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

export const User = mongoose.model('User', UserSchema);
