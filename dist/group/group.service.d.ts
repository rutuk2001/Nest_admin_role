import { Group } from "./entities/group.entity";
import { Repository } from "typeorm";
import { User } from "src/users/entities/user.entity";
export declare class GroupService {
    private readonly groupRepository;
    private readonly userRepository;
    constructor(groupRepository: Repository<Group>, userRepository: Repository<User>);
    createGroupAndAssignAdmin(groupName: string, adminEmail: string, role: string): Promise<Group>;
    addUsersToGroup(groupId: string, userEmails: string[], role: string): Promise<Group>;
    getAllGroups(role: string): Promise<Group[]>;
    getGroupById(groupId: string, role: string): Promise<Group>;
}
