import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Register, RegisterDocument } from './register.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { ForgetDto } from './dto/forget.dto';


@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(Register.name) private registerModel: Model<RegisterDocument>,
    private jwtService: JwtService, // Inject JwtService here
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const createdUser = new this.registerModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async login(loginDto: LoginDto) {
    const user = await this.registerModel.findOne({ email: loginDto.email });
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user._id , firstName: user.firstName, lastName: user.lastName , phoneNumber: user.phoneNumber };
    return {
      access_token: this.jwtService.sign(payload), // Use jwtService here
    };
  }

  async forgetPassword(forgetDto: ForgetDto) {
    const user = await this.registerModel.findOne({ email: forgetDto.email });
    if (!user) {
      throw new UnauthorizedException(' Warning: The E-Mail Address was not found in our records, please try again!');
    }
    const token = this.jwtService.sign({ email: user.email, sub: user._id });
    const resetLink = `http://your-frontend-domain.com/reset-password?token=${token}`;
    await this.sendResetPasswordEmail(user.email, resetLink);
    return { message: 'Password reset link sent to your email' };
  }

  private async sendResetPasswordEmail(email: string, resetLink: string) {
    const transporter = nodemailer.createTransport({
        // host: 'smtp.example.com', // Use a real SMTP service
        // port: 587,
        // secure: false, // true for 465, false for other ports
        service: 'Gmail',
        auth: {
          user: 'khalilkapo15@gmail.com', // Your email
          pass: 'vhpvalolvducobya', // Your email password
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
  
      const mailOptions = {
        from: '"Ecommerce Support" <khalilkapo15@gmail.com>', // Sender address
        to: email, 
        subject: 'Password Reset Request',
        text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}`,
      };
  
      await transporter.sendMail(mailOptions);
  }
}
