import { Body, Controller, Logger, Post, Req, Res, UseGuards } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { LoginDto } from "./dto/login.dto";
import { Request } from "express";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Credentials } from "./models/credentials.model";
import { AuthService } from "./auth.service";
import { RefreshTokenGuard } from "./guards/jwt-refresh.guard";
import { Public } from "src/common/decorators/public.decorators";
import { UserDetails } from "./models/user-details.model";
import { instanceToPlain } from "class-transformer";
import { claimFromUserDetails } from "./utills/auth.util";
import { AuthenticateUser, signOutMessage } from "./models/authenticate-user.model";
import { Token } from "./models/token.model";
import { Response } from "express";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post("sign-in")
  @Public()
  @ApiOperation({
    summary: "user Sign-In",
    description:
      "Authenticate a user with username and password , and return an access token or mfa prompt",
  })
  @ApiBody({
    type: LoginDto,
    description:
      "Authenticate a user with username and password, and return an access token or MFA prompt.",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully authenticated user.",
    type: AuthenticateUser,
  })
  public async signIn(
    @Req() request: Request,
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response:Response
  ): Promise<AuthenticateUser> {
    {
      const { username, password } = loginDto;
      const { clientType, useragent } = request;

      const userDetails = await this.userService.validateUser(
        new Credentials({
          userName: username,
          password: password,
          deviceType: clientType,
        }),
        useragent,
      );
      this.logger.log(
        `Login request made from ${request.clientType} application.`,
      );
      this.logger.log(`sign-in request initiated for user :${username}`);


      return await this.authService.signIn(userDetails, clientType, useragent, response);
        
    
    }
  }

  @Post("sign-out")
  @ApiOperation({
    summary: "Sign-Out",
    description: "Sign out User."
  })
  @ApiResponse({
    status: 200,
    description: "SuccessFully sign-out.",
    type:signOutMessage
  })
  
  async signOut(@Req() request: Request): Promise<signOutMessage> {
    this.logger.log(`User ${request?.user} - sign out. `);
    return { message: "You have been successfully logout." };
  }

  @Post("refresh-token")
  @Public()
  @UseGuards(RefreshTokenGuard)
  @ApiOperation({ summary: "Refresh JWT tokens using refresh token" })
  @ApiResponse({
    status: 200,
    description: "Tokens successfully refreshed",
    type: Token
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized, the refresh token is invalid or expired.",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error.",
  })
  async refreshToken(@Req() request: Request): Promise<Token> {
    const { iat, exp, ...claims } = request.user as any;
   const userDetail = claimFromUserDetails(claims);
   
    this.logger.log(`refresh token request for user:  ${userDetail?.email}`);
    return this.authService.generateToken(userDetail);
  }
}
