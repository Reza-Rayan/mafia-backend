import { TypeOrmModule } from "@nestjs/typeorm";
// Entities
import { Article } from "src/articles/entities/article.entity";


export const database = TypeOrmModule.forRoot({
    type:"postgres",
    host:process.env.DB_HOST,
    port:Number(process.env.DB_PORT),
    username:process.env.DB_USERNAME,
    password:"2wsx3edc",
    database:"postgres",
    autoLoadEntities:true,
    synchronize:true,
  })
