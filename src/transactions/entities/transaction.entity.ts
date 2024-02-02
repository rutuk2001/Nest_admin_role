import { User } from "src/users/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
@Entity({ name: "Transactions" })
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  public transaction_id: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ nullable: false })
  public transaction_item: string;

  @Column({ default: "Done" })
  public status: string;
}
