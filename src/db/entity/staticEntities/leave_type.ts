import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class leave_type {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    leave_type!: string;
}
