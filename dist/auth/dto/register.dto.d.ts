import { Role } from '../../entities/adherent.entity';
export declare class RegisterDto {
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    role: Role;
}
