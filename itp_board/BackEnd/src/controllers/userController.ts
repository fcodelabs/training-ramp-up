import { AppDataSource } from '../configs/db.config'
import { User } from '../models/user'

const userRepository = AppDataSource.getRepository(User);

async function createUser(user:User):Promise<User>{
    const response = await userRepository.save(user);
    return response;
}
