import { Injectable } from "@nestjs/common";
import { compare } from "bcrypt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(private userservice: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userservice.findOne(email);

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return "incorrect password";
    }

    if (user && isPasswordValid) {
      const { email, password, ...rest } = user;
      return rest;
    }

    return null;
  }
}
