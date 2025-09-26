/* eslint-disable @nx/enforce-module-boundaries */
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Company, User, Business, Owner } from '@ultra-stack/entities';

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

const entities = [Company, User, Business, Owner];
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities,
      url: process.env.PG_URL,
    }),
    import('@adminjs/nestjs').then(async ({ AdminModule }) => {
      const { Database, Resource } = await import('@adminjs/typeorm');
      await import('@adminjs/express');
      const { AdminJS } = await import('adminjs');
      AdminJS.registerAdapter({ Database: Database, Resource: Resource });

      return AdminModule.createAdmin({
        adminJsOptions: {
          rootPath: '/admin',
          resources: entities,
        },
        auth: {
          authenticate,
          cookieName: 'adminjs',
          cookiePassword: 'secret',
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret',
        },
      });
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
