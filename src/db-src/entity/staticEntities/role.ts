import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    role!: string;
}
