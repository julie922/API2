import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateMatchDto {
  @IsString()
  @IsNotEmpty()
  equipeAdverse: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  lieu: string;

  @IsString()
  @IsOptional()
  score?: string;
}
