import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    _id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

export const user = (req: Request, res: Response, next: NextFunction) => {
    // same with !req.session  || !req.session.jwt
    if (!req.cookies.jsonwebtoken) return next();

    try {
        const payload = jwt.verify(
            req.cookies.jsonwebtoken,
            process.env.JWT_KEY!
        ) as UserPayload;
        req.user = payload;
    } catch (error) {
        return res.status(400).send(error);
    }

    next();
};

export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.user) return res.sendStatus(401);

    next();
};
