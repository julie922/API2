import { Repository } from 'typeorm';
import { Adherent } from '../entities/adherent.entity';
import { Match } from '../entities/match.entity';
export declare class AdherentsService {
    private adherentRepository;
    private matchRepository;
    constructor(adherentRepository: Repository<Adherent>, matchRepository: Repository<Match>);
    findAll(): Promise<Partial<Adherent>[]>;
    findOne(id: number): Promise<Partial<Adherent>>;
    validateAdherent(id: number): Promise<{
        message: string;
    }>;
    inscrireMatch(adherentId: number, matchId: number): Promise<{
        message: string;
    }>;
    desinscrireMatch(adherentId: number, matchId: number): Promise<{
        message: string;
    }>;
}
