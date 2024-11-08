import { Module } from '@nestjs/common';
import { database } from './db/database';
import { ConfigModule } from '@nestjs/config';
import {config} from "./config/config"
import { ArticlesModule } from './articles/articles.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommentsModule } from './comments/comments.module';
import { GameRolesModule } from './game_roles/game_roles.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './@interceptors/transform.interceptor';
import { UsersModule } from './users/users.module';

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
    CommentsModule,
    GameRolesModule,
    UsersModule
  ],
  controllers: [],
  providers: [
    {
      provide:APP_INTERCEPTOR,
      useClass:TransformInterceptor
    }
  ],
})
export class AppModule {}
