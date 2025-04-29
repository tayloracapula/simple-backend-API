import { Entity, PrimaryGeneratedColumn, Column, OneToMany, type Relation } from "typeorm";
import { user } from "../entities/user";


@Entity()
export class role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    role!: string;

    @OneToMany(() => user,(user) => user.role)
    user!: Relation<user[]>;
}
