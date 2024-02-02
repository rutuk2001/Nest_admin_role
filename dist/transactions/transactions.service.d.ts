import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { Transaction } from "./entities/transaction.entity";
import { Repository } from "typeorm";
export declare class TransactionsService {
    private readonly transactionRepo;
    constructor(transactionRepo: Repository<Transaction>);
    create(createTransactionDto: CreateTransactionDto, user_id: any, role: string): Promise<Transaction>;
    getTransactionsByUserId(userId: string, role: string): Promise<Transaction[]>;
    getAllTransactions(role: string): Promise<Transaction[]>;
    removeTransaction(userId: string, transactionId: string, role: string): Promise<Transaction>;
}
