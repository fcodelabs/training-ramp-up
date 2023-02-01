import { NextFunction } from 'express';
import { PostgresDataSource } from '../configs/db';
const bcrypt = require('bcrypt');
import { User } from '../models/UserModel';

export async function signUpUser(value: User, next: NextFunction) {
    try{
        const email = value.email
        const userRepository = PostgresDataSource.getRepository(User)
        const existingUser = await userRepository.findOneBy({
            email: email
        })
        if(!existingUser){
            const hashedPassword = await bcrypt.hash(value.password, 10);
            const newUser = new User()
            newUser.email = value.email
            newUser.password = hashedPassword
            newUser.role = 'student'
            
            await PostgresDataSource.manager.save(newUser)
            const user = PostgresDataSource.getRepository(User).create(newUser)
            return await PostgresDataSource.getRepository(User).save(user)
        }else{
            return null
        }
    } catch (err) {
        next(err)
    }
}

export async function signInUserService(value: User, next: NextFunction){
    try{
        const email = value.email
        const password = value.password
        const userRepository = PostgresDataSource.getRepository(User)
        const loggedUser = await userRepository.findOneBy({
            email: email
        })
        console.log(loggedUser)
        if(loggedUser){
            if(await bcrypt.compare(password, loggedUser.password)){
                return loggedUser
            }else{
                return next(new Error('Password is Incorrect!'))
            }
        }else{
            return null
        }
    } catch(err) {
        next(err)
    }
}