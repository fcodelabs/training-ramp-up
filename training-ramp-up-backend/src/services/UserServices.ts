import * as express from 'express'
import { User } from '../models/User'
import { appDataSource } from '../configs/dataSourceConfig'
import { InsertResult } from 'typeorm'

export const getUser = async (username:string): Promise<User> => {
    try {
        const user = await appDataSource.manager
            .getRepository(User)
            .findOne({
                where: {
                    username: username,
                },
            })
        return user
    } catch (err) {
        throw err
    }
}

export const getUsers = async (): Promise<Array<User>> => {
    try {
        const user = await appDataSource.manager
            .getRepository(User)
            .find()
        return user
    } catch (err) {
        throw err
    }
}

export const addUser = async (input: User): Promise<InsertResult> => {
    try {
        const user = { ...input }
        const res = await appDataSource.manager.insert(User, user)
        return res
    } catch (err) {
        throw err
    }
}

