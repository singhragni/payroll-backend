import { Module } from '@nestjs/common';
import { LoginInfoController } from './login-info.controller';
import { LoginInfoService } from './login-info.service';
import { LoginInfo } from 'src/common/entities/user-login-info.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  exports:[LoginInfoService,],
  controllers: [LoginInfoController],
  providers: [LoginInfoService],
  imports: [TypeOrmModule.forFeature([LoginInfo])]
})
export class LoginInfoModule {}
