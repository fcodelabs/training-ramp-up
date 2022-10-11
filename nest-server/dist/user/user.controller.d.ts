import { Users } from 'src/entity/user.interface';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(User: Users): Promise<any>;
    logUser(req: any): Promise<any>;
}
