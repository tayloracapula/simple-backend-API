import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";


@Entity()
export class department {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    department!: string;
}
