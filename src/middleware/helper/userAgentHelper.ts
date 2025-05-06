import { Injectable } from "@nestjs/common";
import { UserAgentModel } from "../models/UserAgentModel";
import * as useragent from 'useragent'
import { Request } from "express";


@Injectable()
export class UserAgentHelper{
    constructor(){}

    public getUserAgent(request:Request):UserAgentModel{
        const agent = useragent.parse(request.headers['user-agent']);

        if(!request.headers['x-real-ip']){
            request.headers['x-real-ip'] = request['ip'];
        }   
        

        return new UserAgentModel({
            ip: request.headers['x-real-ip'],
            browser: agent.toAgent(),
            browserVersion: `${agent.family} ${agent.major}.${agent.minor}.${agent.patch}`,
            os: agent.os.toString(),
            device: agent.device.toString()
            }

        );
    }
}