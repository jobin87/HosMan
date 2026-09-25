import { IsNotEmpty, IsOptional, IsString, IsIn } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsIn(['todo', 'in_progress', 'completed'], { message: "Status must be 'todo', 'in_progress', or 'completed'" })
  status?: string;

  @IsOptional()
  @IsString()
  userId?: string;
}
