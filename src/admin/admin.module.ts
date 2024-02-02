import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { User } from "src/users/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmailService } from "src/helper/email.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AdminController],
  providers: [AdminService, EmailService],
})
export class AdminModule {}
