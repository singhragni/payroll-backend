import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { ConfigWrapperService } from "src/common/config/config.service";



@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor(
    configService: ConfigWrapperService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField("refresh"),
      ignoreExpiration: false,
      secretOrKey: configService.refreshTokenSecret,
    });
  }

  async validate(payload: any) {
    return {
      ...payload
    };
  }
}
