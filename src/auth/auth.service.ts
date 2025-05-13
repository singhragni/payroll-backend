import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DEVICE_TYPE } from "src/middleware/enums/middileware.enum";
import { UserAgentModel } from "src/middleware/models/UserAgentModel";
import { UserModel } from "src/user/models/user.model";
import { Token } from "./models/token.model";
import { UserService } from "src/user/user.service";
import { AuthenticateUser } from "./models/authenticate-user.model";
import { AuthenticateStatus } from "./enum/authenticate-user.enum";
import { claimFromUserDetails } from "./utills/auth.util";
import { LOGIN_METHOD, LOGIN_STATUS } from "src/login-info/enums/login.enum";
import { LoginInfoService } from "src/login-info/login-info.service";
import { ConfigWrapperService } from "src/common/config/config.service";
import { User_Message } from "./constant/user-message";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigWrapperService,
    private readonly loginInfoStatus: LoginInfoService,
  ) {}

  async signIn(
    userDetails: UserModel,
    clientType: DEVICE_TYPE,
    useragent: UserAgentModel,
    response: Response
  ) {
    const claimsPayloadDetails =
      claimFromUserDetails(userDetails) || null;

    const { accessToken, refreshToken } = await this.signToken(claimsPayloadDetails);

    //update user last login
    await this.userService.updateUserData(userDetails.id);

    await this.loginInfoStatus.processLoginStatus(
      useragent,
      userDetails.email,
      LOGIN_STATUS.SUCCESS,
      clientType,
      LOGIN_METHOD.DEFAULT,
      User_Message.SIGN_IN,
    );
    

    response.cookie('accessToken', accessToken,{
      httpOnly: true,
      secure:  false,
      sameSite: 'strict'
    });

    response.cookie('refreshToken', {
      httpOnly: true,
      secure:  false,
      sameSite: 'strict'
    })
    return new AuthenticateUser({
      status: AuthenticateStatus.AUTHENTICATED,
      isMFAEnabled: false,
    });
  }

  public async signToken(claims: any) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(claims, {
        secret: this.configService.accessTokenSecret,
        expiresIn: this.configService.accessTokenExpiresAt,
      }),
      this.jwtService.signAsync(claims, {
        secret: this.configService.refreshTokenSecret,
        expiresIn: this.configService.refreshTokenExpiresAt,
      }),
    ]);
    return new Token({ accessToken, refreshToken });
  }

  public async generateToken(userDetails: any) {
    const { accessToken, refreshToken } = await this.signToken(userDetails);


    return new Token({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  }
}
