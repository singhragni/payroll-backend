import { BaseModel } from 'src/shared/models/base.model';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tab_payroll')
export class Payroll extends BaseModel {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'employee_id', type: 'char', length: 36 })
  employeeId: string;

  @Column({ name: 'basic_salary', type: 'decimal', precision: 15, scale: 2, default: 0.00 })
  basicSalary: number;

  @Column({ name: 'hra', type: 'decimal', precision: 15, scale: 2, default: 0.00 })
  hra: number;

  @Column({ name: 'other_allowances', type: 'decimal', precision: 15, scale: 2, default: 0.00 })
  otherAllowances: number;

  @Column({ name: 'gross_salary', type: 'decimal', precision: 15, scale: 2, default: 0.00 })
  grossSalary: number;

  @Column({ name: 'taxable_income', type: 'decimal', precision: 15, scale: 2, default: 0.00 })
  taxableIncome: number;

  @Column({ name: 'tax_deductions', type: 'decimal', precision: 15, scale: 2, default: 0.00 })
  taxDeductions: number;

  @Column({ name: 'net_salary', type: 'decimal', precision: 15, scale: 2, default: 0.00 })
  netSalary: number;

  @Column({ name: 'salary_month', type: 'date' })
  salaryMonth: Date;

  @Column({
    name: 'payment_status',
    type: 'enum',
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending',
  })
  paymentStatus: 'Pending' | 'Paid' | 'Failed';

  @Column({ name: 'payment_date', type: 'date', nullable: true })
  paymentDate: Date | null;

  @Column({
    name: 'payment_mode',
    type: 'enum',
    enum: ['Bank Transfer', 'Cheque', 'Cash'],
    default: 'Bank Transfer',
  })
  paymentMode: 'Bank Transfer' | 'Cheque' | 'Cash';

  @Column({ name: 'bank_transaction_id', type: 'varchar', length: 255, nullable: true })
  bankTransactionId: string | null;

  @Column({ name: 'processed_by', type: 'varchar', length: 255, nullable: true })
  processedBy: string | null;

  @Column({ name: 'remarks', type: 'text', nullable: true })
  remarks: string | null;


  @Column({ name: 'created_by', type: 'char', length: 36, nullable: true })
  createdBy: string | null;

  @Column({ name: 'modified_by', type: 'varchar', length: 36, nullable: true })
  modifiedBy: string | null;
}
