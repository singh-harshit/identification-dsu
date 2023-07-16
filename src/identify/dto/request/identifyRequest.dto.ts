import { IsEmail, IsNumberString, IsOptional } from 'class-validator';

export class IdentifyRequestDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNumberString()
  phoneNumber?: number;
}
