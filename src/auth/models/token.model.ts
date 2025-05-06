export class Token {
    accessToken: string;
    refreshToken: string;
    constructor(arg:any){
        Object.assign(this,arg);
    }
}