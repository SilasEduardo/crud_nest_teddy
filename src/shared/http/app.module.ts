import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../../modules/users/users.module'
import '../database/database';

@Module({
  imports:

    [

      UsersModule,
      ConfigModule.forRoot(),
    ]
})
export class AppModule { }
