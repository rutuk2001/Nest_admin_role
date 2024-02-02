import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";

@Controller("transactions")
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}
  @UseGuards(AuthenticatedGuard)
  @Post()
  create(@Request() req, @Body() createTransactionDto: CreateTransactionDto) {
    const userid = req.user.id;
    const role = req.user.role;
    return this.transactionsService.create(createTransactionDto, userid, role);
  }
  @UseGuards(AuthenticatedGuard)
  @Get("mytransactions/:userId")
  async getTransactionsByUserId(
    @Param("userId") userId: string,
    @Request() req
  ) {
    const role = req.user.role;
    return this.transactionsService.getTransactionsByUserId(userId, role);
  }
  @UseGuards(AuthenticatedGuard)
  @Get("getalltransactions")
  async getAllTransactions(@Request() req) {
    const role = req.user.role;
    return this.transactionsService.getAllTransactions(role);
  }
  @UseGuards(AuthenticatedGuard)
  @Delete(":id/delete")
  remove(@Param("id") id: string, @Request() req) {
    const role = req.user.role;
    const userid = req.user.id;
    return this.transactionsService.removeTransaction(userid, id, role);
  }
}
