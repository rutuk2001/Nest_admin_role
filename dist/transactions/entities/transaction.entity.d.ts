import { User } from "src/users/entities/user.entity";
export declare class Transaction {
    transaction_id: string;
    user: User;
    transaction_item: string;
    status: string;
}
