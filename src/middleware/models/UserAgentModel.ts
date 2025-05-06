export class UserAgentModel{
    ip: string
    browser: string;
    browserVersion:string;
    os:string;
    device:string;

    constructor(args:any){
        Object.assign(this,args)
    }
}