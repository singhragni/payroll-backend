import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmployeePractice } from "./employee01.entity";


@Entity({name:"tab_project"})
export class Project{
    @PrimaryGeneratedColumn()
    id:number;


    @Column({name:"project_name"})
    projectName: string;


    @ManyToOne(()=> EmployeePractice)
    @JoinColumn({name:"emp_id"})
    employeePractice: EmployeePractice;

}