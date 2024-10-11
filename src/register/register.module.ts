import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { Register, RegisterSchema } from './register.schema';
import { JwtStrategy } from './../jwt.strategy';

@Module({
  imports: [
  MongooseModule.forFeature([{ name: Register.name, schema: RegisterSchema }]),
    JwtModule.register({
      secret: 'your-secret-key', // Replace with a strong secret
      signOptions: { expiresIn: '14h' }, // Token expiration time
    }),
    PassportModule,
  ],
  controllers: [RegisterController],
  providers: [RegisterService, JwtStrategy],
})
export class RegisterModule {}
