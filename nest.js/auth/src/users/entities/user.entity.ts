import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../enums/role.enum';
import { ApiKey } from '../api-keys/entities/api-key.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  // GOOGLE
  @Column({ nullable: true })
  googleId: string;

  // ROLE (exclusive to PERMISSION)
  @Column({ enum: Role, default: Role.Regular })
  role: Role;

  // 2FA
  @Column({ default: false })
  isTfaEnabled: boolean;

  @Column({ nullable: true })
  tfaSecret: string;

  // PERMISSION (exclusive to ROLE)
  // @Column({ enum: Permission, default: [], type: 'json' })
  // permissions: PermissionType[];

  // APIKEY
  @JoinTable()
  @OneToMany((type) => ApiKey, (apiKey) => apiKey.user)
  apiKeys: ApiKey[];
}
