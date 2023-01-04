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
       
        const refreshToken = req.cookies.refreshToken
        const validRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_KEY,(err:Error
            ,payload:User)=>{
              const tokenCreated=  requestNewAccessToken(req,res)
              if(tokenCreated)return next()
        })
    

    }else{

    try {
        const validAccessToken = jwt.verify(accessToken, process.env.ACCESS_KEY)

        return next()
        
    } catch {
        return res.sendStatus(403)
    }
}
}
