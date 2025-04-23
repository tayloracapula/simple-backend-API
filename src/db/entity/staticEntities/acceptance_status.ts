import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class acceptance_status {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    status!: string;
}
