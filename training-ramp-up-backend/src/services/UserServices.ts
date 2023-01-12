import * as express from 'express'
import { User } from '../models/User'
import { appDataSource } from '../configs/dataSourceConfig'
import { InsertResult } from 'typeorm'
import bcrypt = require('bcrypt')
import jwt = require('jsonwebtoken')

export const getUser = async (username: string, password: string) => {
    try {
        const user = await appDataSource.manager.getRepository(User).findOne({
            where: {
                username: username,
            },
        })

        if (user) {
            const isPasswordMatch = await bcrypt.compare(
                password,
                user.password
            )
            if (isPasswordMatch) {
                return user
            } else {
                return { err: 'Incorrect Password' }
                // throw new Error('Incorrect Password')
            }
        } else {
            return { err: 'User Not Found' }
            //throw new Error('User Not Found')
        }
    } catch (err) {
        return { err: 'Can not get use details.Error occured' }
        //throw err
    }
}

export const isUserAlreadyExist = async (username: string) => {
    try {
        const user = await appDataSource.manager.getRepository(User).findOne({
            where: {
                username: username,
            },
        })
        return user != null ? true : false
    } catch (err) {
        return { err: 'Failed to check whether user exists.Error occured' }
    }
}

export const addUser = async (input: User) => {
    try {
        const password = await bcrypt.hash(input.password, 12)
        const user = {
            name: input.name,
            username: input.username,
            password: password,
            role: process.env.USER_ROLE,
        }
        const res = await appDataSource.manager.insert(User, user)
        return res
    } catch (err) {
        return { err: 'Can not and user.Error occured' }
    }
}
