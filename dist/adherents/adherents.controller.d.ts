import { AdherentsService } from './adherents.service';
export declare class AdherentsController {
    private readonly adherentsService;
    constructor(adherentsService: AdherentsService);
    findAll(): Promise<Partial<import("../entities/adherent.entity").Adherent>[]>;
    findOne(id: number): Promise<Partial<import("../entities/adherent.entity").Adherent>>;
    validateAdherent(id: number): Promise<{
        message: string;
    }>;
    inscrireMatch(req: {
        user: {
            id: number;
        };
    }, matchId: number): Promise<{
        message: string;
    }>;
    desinscrireMatch(req: {
        user: {
            id: number;
        };
    }, matchId: number): Promise<{
        message: string;
    }>;
}
