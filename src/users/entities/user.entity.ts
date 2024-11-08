import { UserRole } from "src/@enums/User-Role.enum";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    nick_name: string;

    @Column()
    phone: string;

    @Column({ nullable: true })
    avatar: string;

    @Column()
    bio: string;

    @Column()
    email: string;

    @Column({
        type:"enum",
        enum: UserRole,
        default:UserRole.PLAYER
    })
    role:UserRole;

    @Column()
    national_code:string;

    @Column()
    city: string;
}
