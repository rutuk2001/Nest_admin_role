import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { LocalAuthGuard } from "src/auth/local-auth.guard";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";
import { User } from "./entities/user.entity";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Request() req): any {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get("protected")
  getHello(@Request() req): String {
    return req.user;
    console.log();
  }

  @UseGuards(AuthenticatedGuard)
  logout(@Request() req) {
    // Clear the session to log out the user
    console.log(req.session.user);
    req.session.destroy();
    return "Logged out";
  }

  @UseGuards(AuthenticatedGuard)
  @Get(":id")
  async findOne(@Param("id") id: string, @Request() req): Promise<User> {
    const role = req.user.role;
    return this.usersService.getTransactionsByUserId(id, role);
  }

  @UseGuards(AuthenticatedGuard)
  @Get("all")
  async findAll(@Request() req): Promise<User[]> {
    const role = req.user.role;
    return this.usersService.getAllWithTransactions(role);
  }
}
