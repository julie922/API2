import { IsOptional, IsString } from 'class-validator';

export class UpdateNewsDto {
  @IsString()
  @IsOptional()
  titre?: string;

  @IsString()
  @IsOptional()
  contenu?: string;
}
