import { Users } from '../dto/user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(User: Users): Promise<any>;
    logUser(req: any): Promise<any>;
}
