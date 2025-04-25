import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, type Relation } from "typeorm";
import { user_management } from "./user_management";
import { leave_bookings } from "./leave_bookings";
import { role } from "../staticEntities/role";
import { department } from "../staticEntities/department";


@Entity()
export class user {
    @PrimaryGeneratedColumn()
    user_id!: number;

    @Column("text")
    firstname!: string;

    @Column("text")
    lastname!: string;

    @Column("text", { unique: true })
    email!: string;

    @Column("blob")
    password!: Buffer;

    @Column("blob")
    salt!: Buffer;
     
    @ManyToOne(type => role,{nullable:false, onDelete: "CASCADE"})
    role!: role; 

    @ManyToOne(() => department)
    department!: department;

    @Column("integer", { default: 25 })
    annual_leave_balance!: number;

   @OneToMany(type => user_management, user_management => user_management.user)
   user_management!:Relation<user_management>[];

   @OneToMany(() => user_management, user_management => user_management.manager)
   manager_management!:Relation<user_management>[];

   @OneToMany(() => leave_bookings, leave_bookings => leave_bookings.user)
   leave_bookings!:Relation<leave_bookings>[];

}
