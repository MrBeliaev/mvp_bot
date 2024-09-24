import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  telegramId: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  referrer: string;

  @Column({ default: 0 })
  friendsCount: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
