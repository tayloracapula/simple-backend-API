import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class booking_type {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    leave_type!: string;
}
