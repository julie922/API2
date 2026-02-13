import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Adherent } from '../entities/adherent.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private adherentRepository;
    private jwtService;
    constructor(adherentRepository: Repository<Adherent>, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
