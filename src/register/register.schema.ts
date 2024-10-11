import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type RegisterDocument = Register & Document;

@Schema()
export class Register {
  @Prop({ required: true, minlength: 1, maxlength: 32 })
  firstName: string;

  @Prop({ required: true, minlength: 1, maxlength: 32 })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, minlength: 8 })
  password: string;

  @Prop({ required: true, unique: true, minlength: 10, maxlength: 10 })
  phoneNumber: string;  // Added unique: true here

  @Prop({ required: true })
  captcha: string;
}

export const RegisterSchema = SchemaFactory.createForClass(Register);
