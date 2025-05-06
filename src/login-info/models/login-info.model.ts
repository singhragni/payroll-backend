import { DEVICE_TYPE } from "src/middleware/enums/middileware.enum";
import { LOGIN_METHOD, LOGIN_STATUS } from "../enums/login.enum";

export class LoginStatus {
  deviceType: DEVICE_TYPE;
  ipAddress: string;
  browserName?: string;
  loginResult?: LOGIN_STATUS;
  userId: string;
  browserVersion?: string;
  loginMethod: LOGIN_METHOD;
  operatingSystem?: string;
  loginTime?: Date;
  description: string;
  constructor(arg: any) {
    Object.assign(this, arg);
  }
}
