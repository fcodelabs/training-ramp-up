import {AppDataSource} from '../configs/db.config'
import {User} from '../models/user'
import bcrypt from "bcrypt";
import {isValidEmail, isValidName, isValidPassword} from "../utils/validations";
import jwt from 'jsonwebtoken'
import {refreshTokens} from "../utils/refreshTokens";
import dotenv from 'dotenv';
dotenv.config();

const userRepository = AppDataSource.getRepository(User);


type ResponseObj = {
    data:User;
    Authorized:boolean;

}
export async function checkCredentials(email: string, password: string) {
    const user = await userRepository.findOne({where: {email}});
    if (!user) {
        return {
            data: null,
            authorized: false
        };
    } else {
        if (user.password) {
            const hashedPassword = user.password;
            // @ts-ignore
            const token = jwt.sign({email}, process.env.Token_KEY,{ expiresIn: '300s' });
            // @ts-ignore
            const refreshToken = jwt.sign({email},process.env.REFRESH_TOKEN_KEY,{ expiresIn: '24h' })
           refreshTokens.push(refreshToken);

            if (bcrypt.compareSync(password, hashedPassword)) {
                return {
                    data: user,
                    authorized: true,
                    token,
                    refreshToken
                }
            }
        }
        return {
            data: null,
            authorized: false
        }
    }
}

export async function createUser(user: User){
    const {firstName,lastName,email,password} = user;
    if(firstName && lastName && email && password &&
        isValidName(firstName) && isValidName(lastName) && isValidEmail(email) && isValidPassword(password)){
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        user.password = hashedPassword;
        const response = await userRepository.save(user);
        return response;
    }
    console.log('error');
    return null;
}