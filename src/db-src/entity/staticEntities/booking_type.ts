import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class booking_type {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    booking_type!: string;
}
