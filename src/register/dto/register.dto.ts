import { IsString, IsEmail, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  firstName: string;

  @IsString()
  @MinLength(1)
  @MaxLength(32)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  // @MaxLength(50)
  password: string;

  @IsString()
  @MinLength(10)
  @MaxLength(10)
  phoneNumber: string;

  @IsString()
  captcha: string;
}
