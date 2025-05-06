import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/common/entities/user.entity';
import { LoginInfoService } from 'src/login-info/login-info.service';
import { LoginInfoModule } from 'src/login-info/login-info.module';
import { LoginInfo } from 'src/common/entities/user-login-info.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  exports:[UserService],
  imports:[DatabaseModule,LoginInfoModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
