import * as express from 'express'
import { Express, Request, Response } from 'express'
import { Socket } from 'socket.io'
import { io } from '../..'
import { getUser, addUser } from '../services/userServices'
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

            if (user != null) res.status(200).send('Registration Successfull')
            //if (user) res.redirect('http://localhost:3000/home')
        }
    } catch (err) {
        res.status(201).send('Can not add user.Error occured')
    }
}

export const requestSignIn = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const result = await getUser(req.body.username, req.body.password)

        if (result) {
            if (!('err' in result)) {
                const user = result as User
                const payload = {
                    id: user.id,
                    name: user.name,
                    role: user.role,
                }

                const accessKey = process.env.ACCESS_KEY
                const refreshKey = process.env.REFRESH_KEY

                const acessToken = jwt.sign(payload, accessKey, {
                    expiresIn: '5m',
                })
                const refreshToken = jwt.sign(payload, refreshKey, {
                    expiresIn: '24h',
                })

                res.cookie('accessToken', acessToken, {
                    maxAge: 1000 * 60 * 5,
                    httpOnly: true,
                })
                res.cookie('refreshToken', refreshToken, {
                    maxAge: 60 * 60 * 24 * 1000,
                    httpOnly: true,
                })

                res.status(200).send({ auth: true })
            } else {
                res.status(400).send(result)
            }
        }
    } catch (err) {
        res.status(400).send('Error : Can not sign in.Error occured')
    }
}

export const requestNewAccessToken = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const refreshToken = req.cookies.refreshToken
        const user = req.cookies.user

        if (!refreshToken) {
            res.sendStatus(401)
        } else {
            const payload = jwt.verify(refreshToken, process.env.REFRESH_KEY)

            if (payload) {
                const content = {
                    id: user.id,
                    name: user.name,
                    role: user.role,
                }

                const accessKey = process.env.ACCESS_KEY

                const acessToken = jwt.sign(content, accessKey, {
                    expiresIn: '5m',
                })
                res.cookie('accessToken', acessToken, {
                    maxAge: 1000 * 60 * 5,
                    httpOnly: true,
                })
                res.sendStatus(200)
            }
        }
    } catch (err) {
        res.sendStatus(401)
    }
}

export const requestSignOut = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        res.cookie('accessToken', '', {
            maxAge: 0,
            httpOnly: true,
        })
        res.cookie('refreshToken', '', {
            maxAge: 0,
            httpOnly: true,
        })
        res.cookie('user', '', {
            maxAge: 0,
            httpOnly: false,
        })
        res.status(200).send({
            logOut: true,
        })
    } catch (err) {
        res.status(201).send(err.message)
    }
}
export const requestUserDetails = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const payload = jwt.verify(
            req.cookies.accessToken,
            process.env.ACCESS_KEY
        )
        if (payload) {
            const userKey = process.env.USER_KEY
            const user = jwt.sign(payload, userKey)
            res.cookie('user', user, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: false,
            })
            res.sendStatus(200)
        } else {
            res.sendStatus(401)
        }
    } catch (err) {
        res.status(400).send('Error : ' + err.message)
    }
}
