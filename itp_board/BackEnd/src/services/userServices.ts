import {User} from "../models/user";
import {isValidEmail, isValidName, isValidPassword} from "../utils/validations";
import bcrypt from "bcrypt";
import {AppDataSource} from "../configs/db.config";
import jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(User);

export const generateTokens = (email:string)=>{
    // @ts-ignore
    const token = jwt.sign({email}, process.env.Token_KEY, {expiresIn: '300s'});
    // @ts-ignore
    const refreshToken = jwt.sign({email}, process.env.REFRESH_TOKEN_KEY, {expiresIn: '24h'})
    return {token,refreshToken}
}
export const create = async (user: User) => {
    const {firstName, lastName, email, password} = user;
    if (firstName && lastName && email && password) {
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        user.password = hashedPassword;
        const response = await userRepository.save(user);
        const {email,firstName,lastName,admin} = response
        return {email,firstName,lastName,admin};
    }
    return null;
}
    export const checkCredentials = async (email: string, password: string) => {
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

            if (bcrypt.compareSync(password, hashedPassword)) {
                const {email,firstName,lastName,admin} = user
                return {
                    data: {email,firstName,lastName,admin},
                    authorized: true,
                }
            }
        }
        return {
            data: null,
            authorized: false
        }
    }
}
