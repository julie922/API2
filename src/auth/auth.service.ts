import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Adherent } from '../entities/adherent.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Adherent)
    private adherentRepository: Repository<Adherent>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const existing = await this.adherentRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existing) {
      throw new ConflictException('Un compte avec cet email existe déjà');
    }

    const hashedPassword = await bcrypt.hash(registerDto.motDePasse, 10);

    const adherent = this.adherentRepository.create({
      ...registerDto,
      motDePasse: hashedPassword,
      valide: false,
    });

    await this.adherentRepository.save(adherent);

    return {
      message:
        'Compte créé avec succès. Votre compte doit être validé par le club.',
    };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ access_token: string }> {
    const adherent = await this.adherentRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!adherent) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.motDePasse,
      adherent.motDePasse,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    if (!adherent.valide) {
      throw new UnauthorizedException(
        "Votre compte n'a pas encore été validé par le club",
      );
    }

    const payload = {
      sub: adherent.id,
      email: adherent.email,
      role: adherent.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
