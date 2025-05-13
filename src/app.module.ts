import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  Logger,
} from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth/auth.controller";
import { UserService } from "./user/user.service";
import { AuthModule } from "./auth/auth.module";
import { ClientTypeMiddleware } from "./middleware/client-type.middleware";
import { UserAgentMiddleware } from "./middleware/user-agent.middleware";
import { EmployeeModule } from "./employee/employee.module";
import { PayrollModule } from "./payroll/payroll.module";
import { AuthService } from "./auth/auth.service";
import { ConfigModule } from "@nestjs/config";
import { ConfigWrapperModule } from "./common/config/config.module";
import { LoginInfo } from "./common/entities/user-login-info.entity";
import { User } from "./common/entities/user.entity";
import { EmployeeDetails } from "./common/entities/employee.entity";
import { Payroll } from "./common/entities/payroll.entity";
import { LoginInfoModule } from "./login-info/login-info.module";
import { DatabaseModule } from "./database/database.module";
import { ConfigWrapperService } from "./common/config/config.service";
import { EarningTypeEntity } from "./common/entities/earning-component.entity";
import { Project } from "./common/entities/project.entity";
import { EmployeePractice } from "./common/entities/employee01.entity";
import { Department } from "./common/entities/department.entity";

@Module({
  imports: [
    ConfigWrapperModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigWrapperModule],
      inject: [ConfigWrapperService],
      useFactory: (config: ConfigWrapperService) => ({
        type: "mysql",
        host: config.databaseHost,
        port: Number(config.databasePort),
        username: config.databaseUsername,
        password: config.databasePassword,
        database: config.databaseName,
        entities: [User, LoginInfo, EmployeeDetails, Payroll,EarningTypeEntity ],
        synchronize: true,
      }),
    }),

    UserModule,
    AuthModule,
    EmployeeModule,
    PayrollModule,
    LoginInfoModule,
    DatabaseModule,
  ],
  exports: [],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ClientTypeMiddleware, UserAgentMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
