import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";
import { user } from "./user.ts";



@Entity()
export class user_management {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(type => user)
    @JoinColumn({name:"user_id"})
    user!: Awaited<user>;

    @ManyToOne(type => user)
    @JoinColumn({name:"manager_id"})
    manager!:Awaited<user>;

    @Column("text")
    start_date!: Date;

    @Column("text", {nullable:true})
    end_date?: Date;
}
