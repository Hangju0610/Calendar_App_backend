import { Repository } from './../../repository/entity/repository.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Progress } from '../enum/progress.enum';
import { Priority } from '../enum/priority.enum';
import { Size } from '../enum/size.enum';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false })
  repositoryId: number;

  @ManyToOne(() => User, (user) => user.id, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Repository, (repository) => repository.id)
  @JoinColumn()
  repository: Repository;

  @Column({ nullable: false })
  title: string;

  @Column({ type: 'enum', enum: Progress, nullable: true, default: null })
  progress?: Progress;

  @Column({ type: 'enum', enum: Priority, nullable: true, default: null })
  priority?: Priority;

  @Column({ type: 'enum', enum: Size, nullable: true, default: null })
  size?: Size;

  @Column({ nullable: true })
  content?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
