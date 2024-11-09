import {
  Column,
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { User } from './user.entity';
import { Badge } from './badge.entity';

@Entity()
export class UserBadge extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.badges)
  user: User;

  @RelationId((userBadge: UserBadge) => userBadge.user)
  userId: number;

  @ManyToOne(() => Badge, (badge) => badge.userBadges)
  badge: Badge;

  @Column()
  @RelationId((userBadge: UserBadge) => userBadge.badge)
  badgeId: number;
}
