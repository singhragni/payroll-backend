import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { ConfigWrapperService } from "src/common/config/config.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
     configService: ConfigWrapperService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.accessTokenSecret
    });
  }

  async validate(payload: any) {
    console.log({...payload})
    return {
      ...payload
    };
  }
}
