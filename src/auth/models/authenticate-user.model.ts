import { ApiProperty } from "@nestjs/swagger";
import { AuthenticateStatus } from "../enum/authenticate-user.enum";
export class AuthenticateUser {
  @ApiProperty({
    enum: [
      AuthenticateStatus.AUTHENTICATED,
      AuthenticateStatus.NOT_Authenticated,
    ],
  })
  public status: AuthenticateStatus;

  @ApiProperty({
    default: false,
  })
  public isMFAEnabled?: boolean;

  constructor(args: any) {
    Object.assign(this, args);
  }
}

export class signOutMessage {
  @ApiProperty({
    description: "The message return by the api.",
  })
  message: string;
}

export class Token {
  @ApiProperty({
    description: "The User access token",
    example: "ABCvdcdfvbhdfbghfdbgvhfggfngdnfvndf",
  })
  accessToken: string;

  @ApiProperty({
    description: "The User refresh token",
    example: "ABCXGVgvddfvddjnvdsnfvdf",
  })
  refreshToken: string;
}
