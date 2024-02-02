import { Group } from "src/group/entities/group.entity";
import { Transaction } from "../../transactions/entities/transaction.entity";
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "User" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ nullable: false })
  public name: string;

  @Column({ nullable: false, unique: true })
  public email: string;

  @Column({ default: "Admin@123" })
  public password: string;

  @Column({ nullable: false })
  public role: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  @ManyToMany(() => Group, (group) => group.users)
  groups: Group[];
}
