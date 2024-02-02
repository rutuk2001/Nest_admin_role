import { User } from "src/users/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
@Entity({ name: "Group" })
export class Group {
  @PrimaryGeneratedColumn("uuid")
  public groupId: string;

  @Column({ nullable: false })
  public group_name: string;

  @ManyToOne(() => User, { nullable: true, onDelete: "CASCADE" })
  admin: User;

  @ManyToMany(() => User, (user) => user.groups)
  @JoinTable()
  users: User[];
}
