import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    login(req: any): any;
    getHello(req: any): String;
    logout(req: any): string;
    findOne(id: string, req: any): Promise<User>;
    findAll(req: any): Promise<User[]>;
}
