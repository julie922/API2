import { Repository } from 'typeorm';
import { Match } from '../entities/match.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
export declare class MatchsService {
    private matchRepository;
    constructor(matchRepository: Repository<Match>);
    findAll(): Promise<Match[]>;
    findOne(id: number): Promise<Match>;
    create(createMatchDto: CreateMatchDto): Promise<Match>;
    update(id: number, updateMatchDto: UpdateMatchDto): Promise<Match>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
