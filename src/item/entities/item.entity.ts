import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name: string

    @Column()
    description: string

    @ManyToOne(()=> User, user=>user.items)
    owner: User
}
