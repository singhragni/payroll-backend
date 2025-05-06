import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UseFilters,
} from "@nestjs/common";
import { CreateUserDto } from "./user.create.dto";
import { Any, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Credentials } from "src/auth/models/credentials.model";
import { UserAgentModel } from "src/middleware/models/UserAgentModel";
import { UserStatusEnum } from "./enums/user-status.enum";
import { HashingUtils } from "src/shared/utils/hashing.util";
import { UserModel } from "./models/user.model";
import { use } from "passport";
import dayjs from "dayjs";
import { AllExceptionsFilter } from "../common/filters/all-exceptions.filter";
import { User } from "src/common/entities/user.entity";
import { LoginInfo } from "src/common/entities/user-login-info.entity";
import { LoginInfoService } from "src/login-info/login-info.service";
import { LOGIN_METHOD, LOGIN_STATUS } from "src/login-info/enums/login.enum";

@Injectable()
@UseFilters(AllExceptionsFilter)
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepositiory: Repository<User>,
    private readonly loginInfoStatus: LoginInfoService,
  ) {}

  async validateUser(credentials: Credentials, useragent: UserAgentModel) {
    const { userName, password, deviceType } = credentials;
    const currentDate = dayjs();
    const user = await this.getUser(userName);

    if (!user) {
      throw new NotFoundException(
        `User does not exist with this email ${userName}`,
      );
    }

    try {
      switch (user.accountStatus) {
        case UserStatusEnum.NotRegistered:
          throw new BadRequestException(
            `Your account is not registered. Please contact support for assistance.`,
          );

        case UserStatusEnum.Disabled:
          throw new BadRequestException(
            `Your account is not registered. Please contact support for assistance.`,
          );

        case UserStatusEnum.Locked:
          throw new BadRequestException(
            `Your account is locked due to multiple failed login attempts. Please contact support to unlock your account.`,
          );
      }

      if (!user.passwordHash) {
        throw new BadRequestException(`Invalid Password`);
      }

      // const isPasswordMatched = await HashingUtils.compare(
      //   password,
      //   user.passwordHash,
      // );
      // check is account locked?
      const isAccountLocked = this.isAccountLocked(
        user.signInLockedUntil,
        currentDate,
      );

      if (isAccountLocked)
        throw new HttpException(
          `Your account has been locked. It will be unlocked in ${dayjs(user.signInLockedUntil).diff(dayjs(), "m")}`,
          HttpStatus.UNAUTHORIZED,
        );

      // if (!isPasswordMatched) {
      //   // add attempt data in db.
      //   await this.isMaxLimitReached(user);
      //   throw new BadRequestException(`Password does not match`);
      // }
      return this.createUserDetails(user);
    } catch (error: any) {
      await this.loginInfoStatus.processLoginStatus(
        useragent,
        credentials?.userName,
        LOGIN_STATUS.FAILURE,
        deviceType,
        LOGIN_METHOD.DEFAULT,
        error.message || "Internal Server Error",
      );

      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  private isAccountLocked(
    tilLocked: Date | null,
    currentDate: dayjs.Dayjs,
  ): Boolean | null {
    return tilLocked && currentDate.isBefore(currentDate);
  }

  public async getUser(username: string): Promise<User | null> {
    return this.userRepositiory.findOne({
      where: {
        workEmail: username.toLowerCase(),
      },
      relations: {
        employee: true,
      },
    });
  }

  private createUserDetails(user: User) {
    return new UserModel({
      id: user.id,
      email: user.workEmail,
      mfaEnable: user.mfaEnable,
      employeeId: user.employeeId,
      employeeNumber: user.employeeNumber,
    });
  }

  private async isMaxLimitReached(user: User) {
    const MAX_LIMIT = 3;
    const TILL_TIME = 30;
    const isMaxLimitReached =
      user.signInAttempts && user.signInAttempts >= MAX_LIMIT;
    if (isMaxLimitReached) {
      user.signInAttempts = 0;
      user.signInLockedUntil = dayjs().add(TILL_TIME, "m").toDate();
    } else {
      user.signInLockedUntil = null;
      user.signInAttempts = (user.signInAttempts || 0) + 1;
    }
    await this.userRepositiory.save(user);
  }

  public async updateUserData(userId: number) {
    return this.userRepositiory.update(
      {
        id: userId,
      },
      {
        lastLogin: new Date(),
      },
    );
  }
}
