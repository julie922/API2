import { MatchsService } from './matchs.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
export declare class MatchsController {
    private readonly matchsService;
    constructor(matchsService: MatchsService);
    findAll(): Promise<import("../entities/match.entity").Match[]>;
    findOne(id: number): Promise<import("../entities/match.entity").Match>;
    create(createMatchDto: CreateMatchDto): Promise<import("../entities/match.entity").Match>;
    update(id: number, updateMatchDto: UpdateMatchDto): Promise<import("../entities/match.entity").Match>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
