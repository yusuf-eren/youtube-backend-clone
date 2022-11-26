import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { Password } from '../services/password';

export const signupController = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).send('Email in use');

        const user = await User.create({ name, email, password });

        const userJwt = jwt.sign(
            {
                _id: user._id,
                email: user.email,
            },
            process.env.JWT_KEY!
        );

        res.cookie('jsonwebtoken', userJwt);
        res.status(201).send(user);
    } catch (error) {
        return res.status(400).send(error);
    }
};
export const signinController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(400).send('Invalid Credentials');

        const passwordMatch = await Password.compare(
            existingUser.password,
            password
        );

        if (!passwordMatch) return res.status(400).send('Invalid Credentials');

        const userJwt = jwt.sign(
            {
                _id: existingUser.id,
                email: existingUser.email,
            },
            process.env.JWT_KEY!
        );

        res.cookie('jsonwebtoken', userJwt);
        res.status(200).send(existingUser);
    } catch (error) {
        return res.status(400).send(error);
    }
};

export const signoutControler = (req: Request, res: Response) => {
    try {
        res.clearCookie('jsonwebtoken');
        res.sendStatus(200);
    } catch (error) {
        return res.status(400).send(error);
    }
};
