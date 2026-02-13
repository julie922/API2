import { Match } from './match.entity';
export declare enum Role {
    COACH = "coach",
    CONTRIBUTEUR = "contributeur",
    JOUEUR = "joueur"
}
export declare class Adherent {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    role: Role;
    valide: boolean;
    dateInscription: Date;
    matchs: Match[];
}
