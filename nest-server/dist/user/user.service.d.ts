import { Users } from '../dto/user.dto';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepo;
    constructor(userRepo: Repository<Users>);
    createUser(user: Users): Promise<any>;
    logUser(reqUser: Users): Promise<any>;
}
