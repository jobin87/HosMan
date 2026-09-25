import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @IsNotEmpty({ message: 'userEmail is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  userEmail: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString()
  password: string;
}
