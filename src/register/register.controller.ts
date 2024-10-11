import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgetDto } from './dto/forget.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.registerService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginDto) {
    return this.registerService.login(loginUserDto);
  }

  @Post('forget-password')
  forgetPassword(@Body() forgetDto: ForgetDto) {
    return this.registerService.forgetPassword(forgetDto);
  }
}