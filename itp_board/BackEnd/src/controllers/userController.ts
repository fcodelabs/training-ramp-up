import {AppDataSource} from '../configs/db.config'
import {User} from '../models/user'
import bcrypt from "bcrypt";
import {isValidEmail, isValidName, isValidPassword} from "../utils/validations";


const userRepository = AppDataSource.getRepository(User);

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
