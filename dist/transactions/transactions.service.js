"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const transaction_entity_1 = require("./entities/transaction.entity");
const typeorm_2 = require("typeorm");
let TransactionsService = class TransactionsService {
    constructor(transactionRepo) {
        this.transactionRepo = transactionRepo;
    }
    async create(createTransactionDto, user_id, role) {
        if (role === "USER") {
            const newTransaction = this.transactionRepo.create({
                transaction_item: createTransactionDto.transaction_item,
                status: createTransactionDto.status,
                user: user_id,
            });
            return await this.transactionRepo.save(newTransaction);
        }
        else {
            throw new Error("Insufficient privileges to create transactions.");
        }
    }
    async getTransactionsByUserId(userId, role) {
        let transactions;
        if (role === "USER") {
            transactions = await this.transactionRepo.find({
                where: { user: { id: userId } },
            });
            if (!transactions || transactions.length === 0) {
                throw new common_1.NotFoundException(`No transactions found for user with ID ${userId}`);
            }
        }
        else {
            throw new common_1.ForbiddenException(`User with role ${role} is not authorized to view transactions.`);
        }
        return transactions;
    }
    async getAllTransactions(role) {
        let transactions;
        if (role === "SUPPORT_DESK") {
            transactions = await this.transactionRepo.find();
            if (!transactions || transactions.length === 0) {
                throw new common_1.NotFoundException("No transactions found");
            }
        }
        else {
            throw new common_1.ForbiddenException(`User with role ${role} is not authorized to view all transactions.`);
        }
        return transactions;
    }
    async removeTransaction(userId, transactionId, role) {
        let transaction;
        console.log(userId, role, transactionId, ".............");
        if (role === "USER") {
            transaction = await this.transactionRepo.findOne({
                where: { transaction_id: transactionId, user: { id: userId } },
            });
        }
        else {
            throw new common_1.ForbiddenException(`Invalid role ${role} for deleting transactions.`);
        }
        if (!transaction) {
            throw new Error(`Transaction with ID ${transactionId} not found for the user with ID ${userId}`);
        }
        await this.transactionRepo.remove(transaction);
        return transaction;
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map