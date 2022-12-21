import * as express from 'express'
import { Express, Request, Response } from 'express'
import { getUser, addUser, getUsers } from '../services/UserServices'
import { validate } from '../utils/validateUser'

export const requestGetUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const user = await getUser(req.params.username)        
        res.send(user)
    } catch (err) {
        res.send('Error' + err)
    }
}

export const requestAddUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (await validate(req.body)) {
            const user = await addUser(req.body)
            if (user) res.send('Registration Successfull')
        }
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
