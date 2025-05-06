export class UserDetails{
    public sub = Number;
    public email = String;
    public employeeId =String;
    public employeeNumber = String;
    
    constructor(arg:any){
        Object.assign(this,arg)
    }
}