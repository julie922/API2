import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum } from 'class-validator';
import { Role } from '../../entities/adherent.entity';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  prenom: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  motDePasse: string;

  @IsEnum(Role)
  role: Role;
}
