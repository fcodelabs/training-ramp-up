import * as express from 'express'
import { Express, Request, Response } from 'express'
import { Socket } from 'socket.io'
import { io } from '../..'
import { getUser, addUser, getUsers } from '../services/UserServices'
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

            const acessToken = jwt.sign(payload, accessKey, { expiresIn: '5s' })
            const refreshToken = jwt.sign(payload, refreshKey, {
                expiresIn: '24h',
            })

            res.cookie('refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24 * 1000,
                httpOnly: true,
            })
            res.cookie('accessToken', acessToken, {
                maxAge: 1000 * 5,
                httpOnly: true,
            })
            res.send({ auth: true, user: payload })
        }
    } catch (err) {
        console.log('error')

        res.send('Error : ' + err.message)
    }
}

export const requestNewAccessToken = async (
    req: Request,
    res: Response
): Promise<boolean> => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) res.sendStatus(401)

        jwt.verify(
            refreshToken,
            process.env.REFRESH_KEY,
            (err: Error, user: User) => {
                if (err) throw err
                const payload = {
                    id: user.id,
                    name: user.name,
                    role: user.role,
                }

                const accessKey = process.env.ACCESS_KEY

                const acessToken = jwt.sign(payload, accessKey, {
                    expiresIn: '5s',
                })
                res.cookie('accessToken', acessToken, {
                    maxAge: 1000 * 5,
                    httpOnly: true,
                })
                return true
            }
        )
    } catch (err) {
        throw err
    }
    return false
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
        res.status(200).json({
            logOut: true,
        })
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
