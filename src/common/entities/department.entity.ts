import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tab_department" })
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "dep_name" })
  deptName: string;
}
