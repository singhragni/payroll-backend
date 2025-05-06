
import { BaseModel } from 'src/shared/models/base.model';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tab_login_info' })
export class LoginInfo extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ip_address', nullable: true })
  ipAddress: string;

  @Column({ name: 'location', nullable: true })
  location: string;

  @Column({
    name: 'login_time',
    nullable: true,
    type: 'timestamp',
  })
  loginTime: Date;

  @Column({ name: 'browser_name', nullable: true })
  browserName: string;

  @Column({ name: 'browser_version', nullable: true })
  browserVersion: string;

  @Column({ name: 'operating_system', nullable: true })
  operatingSystem: string;

  @Column({ name: 'login_method', nullable: true })
  loginMethod: string;

  @Column({ name: 'login_result', nullable: true })
  loginResult: string;

  @Column({ name: 'user_id', nullable: true })
  userId: string;

  @Column({ type: 'text', name: 'description', nullable: true })
  description: string;

  @Column({
    name: 'device_type',
    nullable: true,
  })
  deviceType: string;
}
