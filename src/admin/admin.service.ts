// admin.service.ts
import { Injectable } from "@nestjs/common";
import { User } from "../users/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAdminDto } from "./admin.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async isEmailUnique(email: string): Promise<boolean> {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    return !existingUser;
  }

  async isSuperAdminExist(): Promise<boolean> {
    const superAdminCount = await this.userRepository.count({
      where: { role: "SUPERADMIN" },
    });
    return superAdminCount > 0;
  }

  async create(createAdminDto: CreateAdminDto) {
    const isEmailUnique = await this.isEmailUnique(createAdminDto.email);

    if (!isEmailUnique) {
      throw new Error("Email is not unique");
    }

    if (createAdminDto.role === "SUPERADMIN") {
      const isSuperAdminExists = await this.isSuperAdminExist();
      if (isSuperAdminExists) {
        throw new Error("Super Admin Cannot be Created");
      }
    }

    const password = createAdminDto.password || "Admin@123";
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      name: createAdminDto.name,
      email: createAdminDto.email,
      password: hashedPassword,
      role: createAdminDto.role,
    });

    return await this.userRepository.save(newUser);
  }
}
