import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Transaction } from "./entities/transaction.entity";
import { Repository } from "typeorm";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
    user_id: any,
    role: string
  ) {
    if (role === "USER") {
      const newTransaction = this.transactionRepo.create({
        transaction_item: createTransactionDto.transaction_item,
        status: createTransactionDto.status,
        user: user_id,
      });

      return await this.transactionRepo.save(newTransaction);
    } else {
      throw new Error("Insufficient privileges to create transactions.");
    }
  }

  async getTransactionsByUserId(
    userId: string,
    role: string
  ): Promise<Transaction[]> {
    let transactions: Transaction[];

    if (role === "USER") {
      transactions = await this.transactionRepo.find({
        where: { user: { id: userId } }, // Assuming your User entity has an 'id' property
      });

      if (!transactions || transactions.length === 0) {
        throw new NotFoundException(
          `No transactions found for user with ID ${userId}`
        );
      }
    } else {
      throw new ForbiddenException(
        `User with role ${role} is not authorized to view transactions.`
      );
    }

    return transactions;
  }

  async getAllTransactions(role: string): Promise<Transaction[]> {
    let transactions: Transaction[];

    if (role === "SUPPORT_DESK") {
      transactions = await this.transactionRepo.find();

      if (!transactions || transactions.length === 0) {
        throw new NotFoundException("No transactions found");
      }
    } else {
      throw new ForbiddenException(
        `User with role ${role} is not authorized to view all transactions.`
      );
    }

    return transactions;
  }

  async removeTransaction(
    userId: string,
    transactionId: string,
    role: string
  ): Promise<Transaction> {
    let transaction: Transaction | undefined;
    console.log(userId, role, transactionId, ".............");
    if (role === "USER") {
      transaction = await this.transactionRepo.findOne({
        where: { transaction_id: transactionId, user: { id: userId } },
      } as any);
    } else {
      throw new ForbiddenException(
        `Invalid role ${role} for deleting transactions.`
      );
    }
    if (!transaction) {
      throw new Error(
        `Transaction with ID ${transactionId} not found for the user with ID ${userId}`
      );
    }

    await this.transactionRepo.remove(transaction);
    return transaction;
  }
}
