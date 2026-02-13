"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const match_entity_1 = require("../entities/match.entity");
let MatchsService = class MatchsService {
    matchRepository;
    constructor(matchRepository) {
        this.matchRepository = matchRepository;
    }
    async findAll() {
        return this.matchRepository.find({ relations: ['participants'] });
    }
    async findOne(id) {
        const match = await this.matchRepository.findOne({
            where: { id },
            relations: ['participants'],
        });
        if (!match) {
            throw new common_1.NotFoundException(`Match avec l'id ${id} non trouvé`);
        }
        return match;
    }
    async create(createMatchDto) {
        const existingMatch = await this.matchRepository.findOne({
            where: { date: createMatchDto.date },
        });
        if (existingMatch) {
            throw new common_1.ConflictException(`Un match est déjà prévu à cette date (${createMatchDto.date})`);
        }
        const match = this.matchRepository.create(createMatchDto);
        return this.matchRepository.save(match);
    }
    async update(id, updateMatchDto) {
        const match = await this.findOne(id);
        Object.assign(match, updateMatchDto);
        return this.matchRepository.save(match);
    }
    async remove(id) {
        const match = await this.findOne(id);
        await this.matchRepository.remove(match);
        return { message: `Match ${id} supprimé` };
    }
};
exports.MatchsService = MatchsService;
exports.MatchsService = MatchsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(match_entity_1.Match)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MatchsService);
//# sourceMappingURL=matchs.service.js.map