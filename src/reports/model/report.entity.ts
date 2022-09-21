import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Report {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    price: number
}