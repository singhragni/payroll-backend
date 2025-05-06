import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserAgentHelper } from 'src/middleware/helper/userAgentHelper';
import { UserAgentMiddleware } from 'src/middleware/user-agent.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { LoginInfoService } from 'src/login-info/login-info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginInfo } from 'src/common/entities/user-login-info.entity';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigWrapperService } from 'src/common/config/config.service';


@Module({
    imports:[UserModule, JwtModule.register({
        global: true,
      }),
      DatabaseModule
    ],
    
    exports:[UserAgentHelper,JwtModule],
    controllers:[AuthController],
    providers:[AuthService,UserAgentHelper,UserAgentMiddleware,JwtStrategy,RefreshJwtStrategy,LoginInfoService,ConfigWrapperService]
})
export class AuthModule {

}
