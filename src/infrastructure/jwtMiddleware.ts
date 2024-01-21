import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import * as process from "process";

export interface RequestWithUser extends Request {
    user?: jwt.JwtPayload;
}

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
}

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer Token

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        (req as RequestWithUser).user = jwt.verify(token, jwtSecret) as jwt.JwtPayload;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
