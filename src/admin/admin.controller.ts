import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./admin.dto";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";
import { EmailService } from "../helper/email.service";

@Controller("admin")
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly emailService: EmailService
  ) {}

  @Post()
  create(@Body() createadminDto: CreateAdminDto) {
    try {
      return this.adminService.create(createadminDto);
    } catch (error) {
      throw new HttpException(
        { message: "Validation failed", errors: error.response.message },
        HttpStatus.BAD_REQUEST
      );
    }
  }
  @UseGuards(AuthenticatedGuard)
  @Post("/create_user")
  async createUser(@Request() req, @Body() createadminDto: CreateAdminDto) {
    const role = req.user.role;
    if (role === "ADMIN") {
      console.log(createadminDto.email, "??????????????????");
      const otp = this.emailService.generateOtp();
      console.log(otp);
      await this.emailService.sendOtpEmail(createadminDto.email, otp);
      // await this.emailService.sendResetPasswordEmail(createadminDto.email);
      return this.adminService.create(createadminDto);
    } else {
      return "You are not an authorised person";
    }
  }
}
