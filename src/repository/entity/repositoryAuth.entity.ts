import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Repository } from './repository.entity';
import { User } from '../../user/entity/user.entity';
import { RepositoryRole } from '../enum/repositoryRole.enum';

@Entity()
export class RepositoryAuth {
  @PrimaryColumn('uuid')
  userId: string;

  @PrimaryColumn()
  repositoryId: number;

  @Column({ type: 'enum', enum: RepositoryRole, default: RepositoryRole.User })
  Role: RepositoryRole;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Repository, (repository) => repository.id)
  repository: Repository;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
