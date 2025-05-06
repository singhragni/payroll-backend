import 'express';
import { DEVICE_TYPE } from 'src/middleware/enums/middileware.enum';
import { UserAgentModel } from 'src/middleware/models/UserAgentModel';

declare module 'express' {
  export interface Request {
    clientType:DEVICE_TYPE ; // You can add any shared types here
    useragent: UserAgentModel; 
  }
}