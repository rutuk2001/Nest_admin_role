import {
  Controller,
  Body,
  Post,
  Param,
  Get,
  UseGuards,
  Request,
} from "@nestjs/common";
import { GroupService } from "./group.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { Group } from "./entities/group.entity";
import { User } from "src/users/entities/user.entity";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";

@Controller("group")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  async createGroupAndAssignAdmin(
    @Body("groupName") groupName: string,
    @Body("adminEmail") adminEmail: string,
    @Request() req
  ) {
    const role = req.user.role;
    try {
      const group = await this.groupService.createGroupAndAssignAdmin(
        groupName,
        adminEmail,
        role
      );
      return { success: true, group };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Post(":groupId/users")
  async addUsersToGroup(
    @Param("groupId") groupId: string,
    @Body("userEmails") userEmails: string[],
    @Request() req
  ) {
    const role = req.user.role;
    try {
      const group = await this.groupService.addUsersToGroup(
        groupId,
        userEmails,
        role
      );
      return { success: true, group };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  async getAllGroups(@Request() req) {
    const role = req.user.role;
    try {
      const groups = await this.groupService.getAllGroups(role);
      return { success: true, groups };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get(":groupId")
  async getGroupById(@Param("groupId") groupId: string, @Request() req) {
    const role = req.user.role;
    try {
      const group = await this.groupService.getGroupById(groupId, role);
      return { success: true, group };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
