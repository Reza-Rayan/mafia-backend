import { Module } from '@nestjs/common';
import { database } from './db/database';
import { ConfigModule } from '@nestjs/config';
import {config} from "./config/config"
import { ArticlesModule } from './articles/articles.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    database,
    ConfigModule.forRoot({
      isGlobal:true,
      load:[config]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ArticlesModule,
    CommentsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}