import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsIn } from 'class-validator';

export class RegisterRequestDto {
  @IsNotEmpty({ message: 'userName is required' })
  @IsString()
  userName: string;

  @IsNotEmpty({ message: 'userEmail is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  userEmail: string;

  @IsNotEmpty({ message: 'password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsOptional()
  @IsString()
  @IsIn(['user', 'admin'], { message: "Role must be 'user' or 'admin'" })
  role?: string;

  @IsOptional()
  @IsString()
  userRegNum?: string;

  @IsOptional()
  @IsString()
  approvedBy?: string;
}
