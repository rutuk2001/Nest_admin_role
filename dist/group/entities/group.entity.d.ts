import { User } from "src/users/entities/user.entity";
export declare class Group {
    groupId: string;
    group_name: string;
    admin: User;
    users: User[];
}
