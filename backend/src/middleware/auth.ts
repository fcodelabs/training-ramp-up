import * as jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
const SECRET_KEY = process.env.SECRET_KEY;

export const authenticateToken = (req, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access denied. Token not provided.' });

    jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
        if (err) return res.status(403).json({ error: 'Invalid token.' });

        req.user = user;
        next();
    });
};


export const authorizeRole = (allowedRoles: string[]) => {
    return (req, res: Response, next: NextFunction) => {
        const userRole = req.user?.role;

        if (!userRole || !allowedRoles.includes(userRole)) {
            return res.status(403).json({ error: 'Access denied. Insufficient privileges.' });
        }
        next();
    };
};