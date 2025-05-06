import { use } from "passport";
import { UserModel } from "src/user/models/user.model";

export const claimFromUserDetails = (user: any | null) => {
  if (!user) return null;
  return {
    sub: user.id,
    email: user.email,
    employeeId: user.employeeId,
    employeeNumber: user.employeeNumber,
    mfaEnable: user.mfaEnable ?? false, // fallback to false if undefined
  };
};
