import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "./entities/group.entity";
import { In, Repository } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { FindOptions } from "typeorm";

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createGroupAndAssignAdmin(
    groupName: string,
    adminEmail: string,
    role: string
  ): Promise<Group> {
    if (role !== "SUPERADMIN") {
      throw new ForbiddenException(
        "Insufficient permissions to add users to the group."
      );
    }

    const admin = await this.userRepository.findOne({
      where: { email: adminEmail },
    });

    if (!admin) {
      throw new NotFoundException("Admin user not found.");
    }

    const group = new Group();
    group.group_name = groupName;
    group.admin = admin;

    return await this.groupRepository.save(group);
  }

  async addUsersToGroup(
    groupId: string,
    userEmails: string[],
    role: string
  ): Promise<Group> {
    console.log(role);
    if (role !== "SUPERADMIN") {
      throw new ForbiddenException(
        "Insufficient permissions to add users to the group."
      );
    }

    const group = await this.groupRepository.findOne({
      where: { groupId },
      relations: ["users"],
    });

    if (!group) {
      throw new NotFoundException("Group not found.");
    }

    const users = await this.userRepository.find({
      where: { email: In(userEmails) },
    });

    if (!users || users.length !== userEmails.length) {
      throw new NotFoundException("Users not found.");
    }

    // Ensure the 'users' property is initialized
    group.users = group.users || [];

    // Add new users to the group
    group.users = [...group.users, ...users];

    return await this.groupRepository.save(group);
  }

  async getAllGroups(role: string): Promise<Group[]> {
    if (role !== "SUPERADMIN") {
      throw new ForbiddenException(
        "Insufficient permissions to add users to the group."
      );
    }
    return await this.groupRepository.find({ relations: ["admin", "users"] });
  }

  async getGroupById(groupId: string, role: string): Promise<Group> {
    if (role !== "SUPERADMIN") {
      throw new ForbiddenException(
        "Insufficient permissions to add users to the group."
      );
    }
    const group = await this.groupRepository.findOne({
      where: { groupId },
      relations: ["admin", "users"],
    });

    if (!group) {
      throw new NotFoundException("Group not found.");
    }

    return group;
  }
}
