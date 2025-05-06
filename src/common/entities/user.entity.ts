import { BaseModel } from "src/shared/models/base.model";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { EmployeeDetails } from "./employee.entity";
import { UserStatusEnum } from "src/user/enums/user-status.enum";

enum Account_Status {
  NotRegistered = "NotRegistered",
  Registered = "Registered",
  Disabled = "Disabled",
  Locked = "Locked",
}

@Entity("tab_user")
@Unique(["employeeNumber"])
@Unique(["workEmail"])
@Unique(["employeeId"])
@Unique(["mobilePhone"])
export class User extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "employee_number", type: "varchar", length: 255 })
  employeeNumber: string;

  @Column({ name: "work_email", type: "varchar", length: 255 })
  workEmail: string;

  @Column({
    name: "mobile_phone",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  mobilePhone: string | null;

  @Column({ name: "display_name", type: "varchar", length: 255 })
  displayName: string;

  @Column({ name: "password_hash", type: "varchar", length: 255 })
  passwordHash: string;

  @Column({ name: "password_reset_token", type: "varchar", length: 255 })
  passwordResetToken: string;

  @Column({ name: "sign_in_attempts", type: "int", default: 0 })
  signInAttempts: number;

  @Column({ name: "mfa_enable", type: "tinyint", default: 1 })
  mfaEnable: boolean;

  @Column({ name: "is_mobile_login_enable", type: "tinyint", default: 1 })
  isMobileLoginEnable: boolean;

  @Column({
    name: "account_status",
    type: "enum",
    enum: UserStatusEnum,
    default: "NotRegistered",
  })
  accountStatus: UserStatusEnum;

  @Column({ name: "last_login", type: "timestamp", nullable: true })
  lastLogin: Date | null;

  @Column({
    name: "last_password_changes_at",
    type: "datetime",
    nullable: true,
  })
  lastPasswordChangesAt: Date | null;

  @Column({
    name: "account_registration_date",
    type: "datetime",
    nullable: true,
  })
  accountRegistrationDate: Date | null;

  @Column({
    name: "sign_in_locked_until",
    nullable: true,
    type: "timestamp",
  })
  signInLockedUntil: Date | null;

  @Column({ name: "employee_id", type: "char", length: 36 })
  employeeId: string;

  @Column({ name: "created_by", type: "char", length: 36, nullable: true })
  createdBy: string | null;

  @Column({ name: "modified_by", type: "char", length: 36, nullable: true })
  modifiedBy: string | null;

  // One-to-one relationship with Employee entity
  @OneToOne(() => EmployeeDetails, (employee) => employee.user, {
    nullable: true,
  })
  @JoinColumn({ name: "employee_id" })
  employee: EmployeeDetails;
}
