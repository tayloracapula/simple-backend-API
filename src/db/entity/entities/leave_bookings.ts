import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { user } from "./user.ts";
import { acceptance_status } from "../staticEntities/acceptance_status";



@Entity()
export class leave_bookings {
    @PrimaryGeneratedColumn()
    booking_id!: number;

    @ManyToOne(() => user)
    @JoinColumn({name:"user_id"})
    user!: user;

    @Column("text")
    booking_type!: string;

    @Column("text")
    start_date!: Date;

    @Column("text")
    end_date!: Date;

    @ManyToOne(() => acceptance_status)
    status!: acceptance_status;

    @Column("text")
    leave_type!: string;
}
