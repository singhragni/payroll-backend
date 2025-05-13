import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import * as useragent from "useragent";
import { OS_TYPE } from "./enums/middileware.enum";
import { DEVICE_TYPE } from "./enums/middileware.enum";

@Injectable()
export class ClientTypeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const userAgent = req.headers["user-agent"];

    const agent = useragent.parse(userAgent);
    if (
      agent.device.family === OS_TYPE.OTHER ||
      agent.os.family === OS_TYPE.ANDROID ||
      agent.OS.family === OS_TYPE.IOS
    ) {
      req['clientType'] = DEVICE_TYPE.MOBILE;
    } else {
      req['clientType'] = DEVICE_TYPE.WEB;
    }

    next();
  }
}
