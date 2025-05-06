import { Injectable, Logger } from "@nestjs/common";
import { UserAgentModel } from "src/middleware/models/UserAgentModel";
import { LOGIN_METHOD, LOGIN_STATUS } from "./enums/login.enum";
import { DEVICE_TYPE } from "src/middleware/enums/middileware.enum";
import { Repository } from "typeorm";
import { LoginInfo } from "src/common/entities/user-login-info.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginStatus } from "./models/login-info.model";

@Injectable()
export class LoginInfoService {
  private readonly logger = new Logger(LoginInfoService.name);
  constructor(
    @InjectRepository(LoginInfo)
    private loginInfoRepository: Repository<LoginInfo>,
  ) {}

  public async processLoginStatus(
    useragent: UserAgentModel,
    userId: string,
    status: LOGIN_STATUS,
    deviceType: DEVICE_TYPE,
    signInRequestType: LOGIN_METHOD,
    description: string,
    loginTime: Date = new Date(),
  ) {
    try {
      await this.recordLoginAttempts({
        deviceType: deviceType,
        ipAddress: useragent?.ip?.toString(),
        browserName: useragent?.browser,
        loginResult: status,
        userId: userId,
        browserVersion: useragent.browserVersion,
        loginMethod: signInRequestType,
        operatingSystem: useragent.os,
        loginTime: loginTime,
        description: description,
      });
    } catch (error: any) {
      this.logger.error(`login info error`, error);
    }
  }

  async recordLoginAttempts(loginStatus: LoginStatus) {
    return this.loginInfoRepository.save(
      this.loginInfoRepository.create(loginStatus),
    );
  }
}
