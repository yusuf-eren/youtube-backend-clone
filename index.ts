import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import { app } from './app';

const start = async () => {
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI must be defined');
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Successfully connected to db');
    } catch (error) {
        console.log(error);
    }
};

start();

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
