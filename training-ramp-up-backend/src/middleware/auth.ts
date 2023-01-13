import { Request, Response, NextFunction } from 'express'
import jwt = require('jsonwebtoken')
import { requestNewAccessToken } from '../controllers/userController'
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
            const payload = jwt.verify(accessToken, process.env.ACCESS_KEY)
            if (payload) return next()
        } catch {
            return res.sendStatus(403)
        }
    }
}

export const authPermissions = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = req.cookies.user
    if (!user) {
        return res.sendStatus(403)
    } else {
        try {
            if (req.method == process.env.GET_REQUEST) {
                return next()
            } else {
                const payload = jwt.verify(user, process.env.USER_KEY)
                const userT = payload as User
                const role = userT.role               
                return role == process.env.ADMIN_ROLE
                    ? next()
                    : res.sendStatus(401)
            }
        } catch {
            return res.sendStatus(403)
        }
    }
}
