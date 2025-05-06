export class UserModel {
    public id: number;
    public email: string;
    public mfaEnable: boolean;
    public employeeId: string;
    public employeeNumber: string;
  
    constructor(arg: Partial<UserModel> = {}) {
      this.id = arg.id ?? 0;
      this.email = arg.email ?? '';
      this.mfaEnable = arg.mfaEnable ?? false;
      this.employeeId = arg.employeeId ?? '';
      this.employeeNumber = arg.employeeNumber ?? '';
    }
  }
  