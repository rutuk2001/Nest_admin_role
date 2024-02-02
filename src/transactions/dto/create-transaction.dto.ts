import { IsNotEmpty } from "class-validator";

export class CreateTransactionDto {
  public user_id: string;

  @IsNotEmpty({ message: "Transaction For is Required" })
  public transaction_item: string;

  @IsNotEmpty({ message: "status is required" })
  public status: string;
}
