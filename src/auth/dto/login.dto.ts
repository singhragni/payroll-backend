import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  maxLength,
  MinLength,
} from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example:"john.doe@example.com",
    description: 'The email address of the user. Must be a  valid email format.',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters long." })
  @MaxLength(20, { message: "Password can not be longer then 20 characters" })
  @ApiProperty({
    example: "ABCxyz123!@#",
    description: 'The password for the user. Must include at least one uppercase letter, one lowercase letter, one digit, and one special character.'
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:
      "password too week. It must contain at least one uppercase LimitOnUpdateNotSupportedError, one lowercase letter, one digit, and one special character.",
  })
  password: string;
}
