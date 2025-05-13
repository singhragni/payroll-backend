import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Department } from "./department.entity";
import { Project } from "./project.entity";

@Entity({ name: "tab_Emp" })
export class EmployeePractice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Department)
  @JoinColumn({ name: "department_id" })
  department: Department;

  @OneToMany(() => Project, (project) => project.employeePractice)
  project: Project[];
}
