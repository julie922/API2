import { Adherent } from './adherent.entity';
export declare class Match {
    id: number;
    equipeAdverse: string;
    date: string;
    lieu: string;
    score: string;
    participants: Adherent[];
}
