import { User } from "../users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateAdminDto } from "./admin.dto";
export declare class AdminService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    isEmailUnique(email: string): Promise<boolean>;
    isSuperAdminExist(): Promise<boolean>;
    create(createAdminDto: CreateAdminDto): Promise<User>;
}
