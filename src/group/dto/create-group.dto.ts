import { IsNotEmpty } from "class-validator";

export class CreateGroupDto {
  @IsNotEmpty({ message: " Group Name is required" })
  public group_name: string;

  @IsNotEmpty({ message: "Need to adds users" })
  public users: string;

  @IsNotEmpty({ message: "Admin is required" })
  public admin: string;
}
