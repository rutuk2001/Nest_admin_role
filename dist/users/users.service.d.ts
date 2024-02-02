import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findOne(email: string): Promise<User>;
    getTransactionsByUserId(userId: string, role: string): Promise<User>;
    getAllWithTransactions(role: string): Promise<User[]>;
}
