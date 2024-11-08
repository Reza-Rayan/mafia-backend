import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "src/@enums/Role.enum";

// Define the Category enum
export enum Category {
    MAFIA = "Mafia",
    CITIZEN = "Citizen",
    INDEPENDENT = "Independent"
}

@Entity()
export class GameRole {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.CITIZEN
    })
    role: Role;
}
