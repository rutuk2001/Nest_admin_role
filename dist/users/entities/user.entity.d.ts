import { Group } from "src/group/entities/group.entity";
import { Transaction } from "../../transactions/entities/transaction.entity";
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    transactions: Transaction[];
    groups: Group[];
}
