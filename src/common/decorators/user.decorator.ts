import { ExecutionContext } from "@nestjs/common";
import { createParamDecorator } from "@nestjs/common/decorators/http";
import { UserModel } from "src/user/models/user.model";

export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (user) return data ? user?.[data] : new UserModel(user);

    return null;
  },
);
