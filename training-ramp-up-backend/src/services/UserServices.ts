import * as express from 'express'
import { User } from '../models/User'
import { appDataSource } from '../configs/dataSourceConfig'
import { InsertResult } from 'typeorm'
import bcrypt = require('bcrypt')
import jwt = require('jsonwebtoken')

export const getUser = async (
    username: string,
    password: string
): Promise<User> => {
    try {
        const user = await appDataSource.manager.getRepository(User).findOne({
            where: {
                username: username,
            },
        })

        if (user != null) {
            const isPasswordMatch = await bcrypt.compare(
                password,
                user.password
            )
            if (isPasswordMatch) {        
                return user
                
            } else {
                throw new Error('Incorrect Password')
            }
        } else {
            throw new Error('User Not Found')
        }
    } catch (err) {
        throw err
    }
}

export const isUserAlreadyExist = async (
    username: string
): Promise<boolean> => {
    try {
        const user = await appDataSource.manager.getRepository(User).findOne({
            where: {
                username: username,
            },
        })
        return user != null ? true : false
    } catch (err) {
        throw err
    }
}

export const getUsers = async (): Promise<Array<User>> => {
    try {
        const user = await appDataSource.manager.getRepository(User).find()
        return user
    } catch (err) {
        throw err
    }
}

export const addUser = async (input: User): Promise<InsertResult> => {
    try {
        const password = await bcrypt.hash(input.password, 12)
        const user = {
            name: input.name,
            username: input.username,
            password: password,
            role: process.env.ROLE,
        }
        const res = await appDataSource.manager.insert(User, user)
        return res
    } catch (err) {
        throw err
    }
}

