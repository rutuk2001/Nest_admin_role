import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  async findOne(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }

  async getTransactionsByUserId(userId: string, role: string): Promise<User> {
    if (role !== "USER") {
      throw new UnauthorizedException(
        "You do not have permission to access this data"
      );
    }
    const user = await this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.transactions", "transactions")
      .where("user.id = :userId", { userId })
      .getOne();

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user;
  }

  async getAllWithTransactions(role: string): Promise<User[]> {
    if (role !== "POWER_USER") {
      throw new UnauthorizedException(
        "You do not have permission to access this data"
      );
    }
    const users = await this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.transactions", "transactions")
      .getMany();

    return users;
  }
}
