import { IsOptional, IsString } from 'class-validator';

export class UpdateMatchDto {
  @IsString()
  @IsOptional()
  equipeAdverse?: string;

  @IsString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  lieu?: string;

  @IsString()
  @IsOptional()
  score?: string;
}
