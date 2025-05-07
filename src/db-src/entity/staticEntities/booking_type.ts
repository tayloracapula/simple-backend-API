import { Entity, PrimaryGeneratedColumn, Column, OneToMany, type Relation } from "typeorm";
import { leave_booking } from "../entities/leave_booking";


@Entity()
export class booking_type {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    booking_type!: string;

    @OneToMany(() => leave_booking ,(leave_bookings) => leave_bookings.booking_type)
    leave_bookings!: Relation<leave_booking[]>
}
