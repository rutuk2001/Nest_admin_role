import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./admin.dto";
import { EmailService } from "../helper/email.service";
export declare class AdminController {
    private readonly adminService;
    private readonly emailService;
    constructor(adminService: AdminService, emailService: EmailService);
    create(createadminDto: CreateAdminDto): Promise<import("../users/entities/user.entity").User>;
    createUser(req: any, createadminDto: CreateAdminDto): Promise<import("../users/entities/user.entity").User | "You are not an authorised person">;
}
