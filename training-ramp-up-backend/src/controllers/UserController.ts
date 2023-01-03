import * as express from 'express'
import { Express, Request, Response } from 'express'
import { Socket } from 'socket.io'
import { io } from '../..'
import {
    getUser,
    addUser,
    getUsers,
    
   
} from '../services/UserServices'
import { validate } from '../utils/validateUser'
import jwt = require('jsonwebtoken')
import { User } from '../models/User'

export const requestSignUp = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (await validate(req.body)) {
            const user = await addUser(req.body)

            if (user) res.send('Registration Successfull')
            //if (user) res.redirect('http://localhost:3000/home')
        }
    } catch (err) {
        res.status(201).send(err.message)
    }
}

export const requestSignIn = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const user = await getUser(req.params.username, req.params.password)

        if (user) {
            const payload = {
                id: user.id,
                name: user.name,
                role: user.role,
            }

            const accessKey = process.env.ACCESS_KEY
            const refreshKey = process.env.REFRESH_KEY

            const acessToken = jwt.sign(payload, accessKey, { expiresIn: '5m' })
            const refreshToken = jwt.sign(payload, refreshKey, {
                expiresIn: '24h',
            })
            const result = {
                auth: true,
                tokens: { accessToken: acessToken, refreshToken: refreshToken },
            }
            res.cookie("accessToken", acessToken, {
                maxAge: 60 * 5 * 1000,
                httpOnly: true,
              });
              res.cookie("refreshToken", refreshToken, {
                maxAge: 60 * 60 * 24 * 1000,
                httpOnly: true,
              });
            
              res.status(200).send({auth:true,user:payload});
             
        }
    } catch (err) {
        res.send('Error : ' + err.message)
    }
}

export const requestNewAccessToken = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const refreshToken = req.body.refreshToken
        if (!refreshToken) res.sendStatus(401)

        jwt.verify(
            refreshToken,
            process.env.RE_TOKEN_KEY,
            (err: Error, user: User) => {
                if (err) res.sendStatus(403)
                const payload = {
                    id: user.id,
                    name: user.name,
                    role: user.role,
                }

                const accessKey = process.env.ACCESS_KEY

                const acessToken = jwt.sign(payload, accessKey, {
                    expiresIn: '5m',
                })
                res.cookie("accessToken", acessToken, {
                    maxAge: 60 * 60 * 1000,
                    httpOnly: true,
                  })
                res.send('New Access token created')
            }
        )
    } catch (err) {
        res.send('Error : ' + err.message)
    }
}

export const requestSignOut = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
          res.status(200).json({
            logOut: true,
          });
    } catch (err) {
        res.status(201).send(err.message)
    }
}
export const requestGetAllUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const user = await getUsers()
        res.status(200).send(user)
    } catch (err) {
        res.status(400).send('Error : ' + err.message)
    }
}
