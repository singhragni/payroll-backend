import { BaseModel } from "src/shared/models/base.model";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EarningTypes } from "./enum/earning-component.enum";

@Entity({ name: "tab_payroll_earning_types" })
export class EarningTypeEntity extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "earning_type_name",
    type: "varchar",
    length: 255,
    unique: true,
    nullable: false,
  })
  earningTypeName: string;

  @Column({
    name: "type",
    type: "enum",
    nullable: false,
    default: "fixed",
    enum: EarningTypes,
  })
  type: EarningTypes;

  @Column({ name: "is_percent_of", type: "int", nullable: true })
  isPercentOf: number | null;

  @Column({ name: "description", type: "text", nullable: false })
  description: string;

  @Column({ name: "is_read_only", type: "tinyint", width:1, default:0 })
  isReadOnly: boolean;

  @Column({ name: "is_taxable", type: "tinyint", width:1, default:0 })
  isTaxable: boolean;

  @Column({ name: "is_lwp", type: "tinyint",width: 1, default: 0 })
  isLwp: boolean;

  @Column({ name: "is_active", type: "tinyint" , width: 1, default: 1})
  isActive: boolean;

  @Column({ name: "created_by", type: "char", length: 36 })
  createdBy: string;

  @Column({ name: "modified_by", type: "char", length: 36 })
  modifiedBy: string;

  @ManyToOne(() => EarningTypeEntity, (earning) => earning.dependantEarnings, {
    nullable: true,
  })
  @JoinColumn({ name: 'is_percent_of' })
  percentEarning: EarningTypeEntity;

  @OneToMany(() => EarningTypeEntity, (earning) => earning.percentEarning)
  dependantEarnings: EarningTypeEntity[];
}
