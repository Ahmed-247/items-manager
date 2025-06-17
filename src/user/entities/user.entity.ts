import { Item } from "src/item/entities/item.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
  Admin = 'admin',
  User = 'user',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column({ type: 'enum', enum: Role, default: Role.User })
    role: Role;

    @OneToMany(()=> Item, item =>item.owner)
    items:Item[]
}
