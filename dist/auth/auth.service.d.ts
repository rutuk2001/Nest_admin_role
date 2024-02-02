import { UsersService } from "src/users/users.service";
export declare class AuthService {
    private userservice;
    constructor(userservice: UsersService);
    validateUser(email: string, password: string): Promise<any>;
}
