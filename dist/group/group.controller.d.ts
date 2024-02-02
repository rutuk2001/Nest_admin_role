import { GroupService } from "./group.service";
import { Group } from "./entities/group.entity";
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    createGroupAndAssignAdmin(groupName: string, adminEmail: string, req: any): Promise<{
        success: boolean;
        group: Group;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        group?: undefined;
    }>;
    addUsersToGroup(groupId: string, userEmails: string[], req: any): Promise<{
        success: boolean;
        group: Group;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        group?: undefined;
    }>;
    getAllGroups(req: any): Promise<{
        success: boolean;
        groups: Group[];
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        groups?: undefined;
    }>;
    getGroupById(groupId: string, req: any): Promise<{
        success: boolean;
        group: Group;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        group?: undefined;
    }>;
}
