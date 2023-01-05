import { Request, Response, NextFunction } from 'express'
import jwt = require('jsonwebtoken')
import { requestNewAccessToken } from '../controllers/UserController'
import { User } from '../models/User'

export const authorization = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const accessToken = req.cookies.accessToken
    if (!accessToken) {
        return res.sendStatus(403)
    } else {
        try {
            const user = req.cookies.user

            const payload = jwt.verify(accessToken, process.env.ACCESS_KEY)
            if ((payload as any).id == user.id) return next()
        } catch {
            return res.sendStatus(403)
        }
    }
}
