import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    create(req: any, createTransactionDto: CreateTransactionDto): Promise<import("./entities/transaction.entity").Transaction>;
    getTransactionsByUserId(userId: string, req: any): Promise<import("./entities/transaction.entity").Transaction[]>;
    getAllTransactions(req: any): Promise<import("./entities/transaction.entity").Transaction[]>;
    remove(id: string, req: any): Promise<import("./entities/transaction.entity").Transaction>;
}
