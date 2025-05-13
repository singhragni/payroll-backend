import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { ConfigWrapperService } from "src/common/config/config.service";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
     configService: ConfigWrapperService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req:Request) => {
          return req?.cookies?.['accessToken'];
        }
      ]),
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
