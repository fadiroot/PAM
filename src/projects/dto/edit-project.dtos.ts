import {
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsString,
  IsInt,
} from 'class-validator';

export class EditProjectDto {
  @IsNotEmpty()
  @IsInt()
  @IsOptional()
  creatorId?: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsInt()
  @IsOptional()
  progress?: number;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  users?: number[]; // Renaming to userIds to clarify it's an array of user IDs
}
