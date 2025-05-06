import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payroll } from 'src/common/entities/payroll.entity';
import { LoginInfo } from 'src/common/entities/user-login-info.entity';
import { User } from 'src/common/entities/user.entity';

@Module({
    imports:[TypeOrmModule.forFeature([LoginInfo, User, Payroll])],
    exports:[TypeOrmModule]
})
export class DatabaseModule {}
