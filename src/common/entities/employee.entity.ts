import { BaseModel } from 'src/shared/models/base.model';
import { Entity, PrimaryColumn, Column, Unique, OneToOne } from 'typeorm';
import { User } from './user.entity';
import {  BloodGroup, EmploymentStatus, MaritalStatus, TimeType } from './enum/employee.enum';

@Entity('tab_employee_details')
@Unique(['employeeNumber'])
@Unique(['workEmail'])
@Unique(['mobilePhone'])
export class EmployeeDetails extends BaseModel {

  @PrimaryColumn({ name: 'id', type: 'char', length: 36 })
  id: string;

  @Column({ name: 'first_name', type: 'varchar', length: 255, nullable: true })
  firstName: string | null;

  @Column({ name: 'last_name', type: 'varchar', length: 255, nullable: true })
  lastName: string | null;

  @Column({ name: 'work_email', type: 'varchar', length: 255, nullable: true })
  workEmail: string | null;

  @Column({ name: 'employee_number', type: 'varchar', length: 255 })
  employeeNumber: string;

  @Column({
    name: 'employment_status',
    type: 'enum',
    enum: EmploymentStatus,
    default: 'Working',
  })
  employmentStatus: EmploymentStatus;

  @Column({
    name: 'marital_status',
    type: 'enum',
    enum: MaritalStatus,
    nullable: true,
  })
  maritalStatus: MaritalStatus | null;

  @Column({
    name: 'blood_group',
    type: 'enum',
    enum: BloodGroup,
    nullable: true,
  })
  bloodGroup: BloodGroup;

  @Column({ name: 'marriage_date', type: 'date', nullable: true })
  marriageDate: Date | null;

  @Column({ name: 'physically_handicapped', type: 'varchar', length: 255, nullable: true })
  physicallyHandicapped: string | null;

  @Column({ name: 'personal_email', type: 'varchar', length: 255, nullable: true })
  personalEmail: string | null;

  @Column({ name: 'mobile_phone', type: 'varchar', length: 255, nullable: true })
  mobilePhone: string|null ;

  @Column({ name: 'work_phone', type: 'varchar', length: 255, nullable: true })
  workPhone: string | null;

  @Column({ name: 'residence_phone', type: 'varchar', length: 255, nullable: true })
  residencePhone: string | null;

  @Column({ name: 'skype_id', type: 'varchar', length: 255, nullable: true })
  skypeId: string | null;

  @Column({ name: 'linkedin_id', type: 'varchar', length: 255, nullable: true })
  linkedinId: string | null;

  @Column({ name: 'payroll_id', type: 'int', nullable: true })
  payrollId: number | null;

  @Column({ name: 'created_by', type: 'char', length: 36, nullable: true })
  createdBy: string | null;

  @Column({ name: 'modified_by', type: 'varchar', length: 36, nullable: true })
  modifiedBy: string | null;

  @Column({
    name: 'time_type',
    type: 'enum',
    enum: TimeType,
    default: 'None',
  })
  timeType:TimeType;

  @Column({ name: 'number_series_id', type: 'int', nullable: true })
  numberSeriesId: number | null;


  @OneToOne(() => User, (user) => user.employee)
  user: User;
}
