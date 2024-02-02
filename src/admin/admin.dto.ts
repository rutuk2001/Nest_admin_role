import { IsEmail, IsNotEmpty, IsIn } from "class-validator";

export class CreateAdminDto {
  @IsNotEmpty({ message: "Name is required" })
  public name: string;

  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email is required" })
  public email: string;

  public password: string;

  @IsNotEmpty({ message: "Role is required" })
  @IsIn(["ADMIN", "SUPERADMIN", "SUPPORT_DESK", "USER", "POWER_USER"], {
    message: "Invalid role",
  })
  public role: string;
}
