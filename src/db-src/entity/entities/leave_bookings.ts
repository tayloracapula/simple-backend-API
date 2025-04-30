import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { user } from "./user.ts";
import { acceptance_status } from "../staticEntities/acceptance_status.ts";
import { booking_type } from "../staticEntities/booking_type.ts";



@Entity()
export class leave_booking {
    @PrimaryGeneratedColumn()
    booking_id!: number;

    @ManyToOne(() => user)
    @JoinColumn({name:"user_id"})
    user!: user;

    @ManyToOne(() => booking_type)
    @JoinColumn({name: "booking_type"})
    booking_type!: booking_type;

    @Column("text")
    start_date!: Date;

    @Column("text")
    end_date!: Date;

    @ManyToOne(() => acceptance_status)
    @JoinColumn({name: "status"})
    status!: acceptance_status;

}
