import { UserRole } from "src/@enums/User-Role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name?: string;

    @Column()
    nick_name?: string;

    @Column()
    phone: string;

    @Column({ nullable: true })
    avatar?: string;

    @Column({ nullable: true })
    bio?: string;

    @Column({ nullable: true })
    email?: string;

    @Column({
        type:"enum",
        enum: UserRole,
        default:UserRole.PLAYER
    })
    role:UserRole;

    @Column({ nullable: true })
    national_code?:string;

    @Column({ nullable: true })
    city?: string;
}
