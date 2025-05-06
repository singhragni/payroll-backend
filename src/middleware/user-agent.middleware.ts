import { Injectable, NestMiddleware } from "@nestjs/common";
import {Request,Response} from 'express';
import { UserAgentHelper } from "./helper/userAgentHelper";


@Injectable()
export class UserAgentMiddleware implements NestMiddleware{
    constructor(private userAgentHelper: UserAgentHelper){}
    use(req: Request, res: Response, next: (error?: Error|any) => void) {
        const useragent = this.userAgentHelper.getUserAgent(req);
        req.useragent = useragent;
        next();
    }
}