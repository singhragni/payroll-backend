import { DEVICE_TYPE } from "src/middleware/enums/middileware.enum";


export class Credentials{
    userName:string;
    password:string;
    deviceType:DEVICE_TYPE
    constructor(arg:any){
        Object.assign(this,arg)
    }
}