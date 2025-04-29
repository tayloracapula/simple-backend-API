import { Entity, PrimaryGeneratedColumn, Column, OneToMany, type Relation } from "typeorm";
import { leave_bookings } from "../entities/leave_bookings";


@Entity()
export class booking_type {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    booking_type!: string;

    @OneToMany(() => leave_bookings ,(leave_bookings) => leave_bookings.booking_type)
    leave_bookings!: Relation<leave_bookings[]>
}
