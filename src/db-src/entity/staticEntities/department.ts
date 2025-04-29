import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, type Relation } from "typeorm";
import { user } from "../entities/user";


@Entity()
export class department {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    department!: string;
    
    @OneToMany(() => user,(user) => user.department)
    user!: Relation<user[]>;
}
