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
exports.AdherentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const adherent_entity_1 = require("../entities/adherent.entity");
const match_entity_1 = require("../entities/match.entity");
let AdherentsService = class AdherentsService {
    adherentRepository;
    matchRepository;
    constructor(adherentRepository, matchRepository) {
        this.adherentRepository = adherentRepository;
        this.matchRepository = matchRepository;
    }
    async findAll() {
        const adherents = await this.adherentRepository.find({
            relations: ['matchs'],
        });
        return adherents.map((a) => ({
            id: a.id,
            nom: a.nom,
            prenom: a.prenom,
            dateInscription: a.dateInscription,
            role: a.role,
            matchs: a.matchs,
        }));
    }
    async findOne(id) {
        const adherent = await this.adherentRepository.findOne({
            where: { id },
            relations: ['matchs'],
        });
        if (!adherent) {
            throw new common_1.NotFoundException(`Adhérent avec l'id ${id} non trouvé`);
        }
        return {
            id: adherent.id,
            nom: adherent.nom,
            prenom: adherent.prenom,
            dateInscription: adherent.dateInscription,
            role: adherent.role,
            matchs: adherent.matchs,
        };
    }
    async validateAdherent(id) {
        const adherent = await this.adherentRepository.findOne({
            where: { id },
        });
        if (!adherent) {
            throw new common_1.NotFoundException(`Adhérent avec l'id ${id} non trouvé`);
        }
        adherent.valide = true;
        await this.adherentRepository.save(adherent);
        return { message: `Adhérent ${adherent.prenom} ${adherent.nom} validé` };
    }
    async inscrireMatch(adherentId, matchId) {
        const adherent = await this.adherentRepository.findOne({
            where: { id: adherentId },
            relations: ['matchs'],
        });
        if (!adherent) {
            throw new common_1.NotFoundException(`Adhérent avec l'id ${adherentId} non trouvé`);
        }
        if (adherent.role !== adherent_entity_1.Role.JOUEUR) {
            throw new common_1.ForbiddenException('Seuls les adhérents ayant le rôle "joueur" peuvent s\'inscrire aux matchs');
        }
        const match = await this.matchRepository.findOne({
            where: { id: matchId },
        });
        if (!match) {
            throw new common_1.NotFoundException(`Match avec l'id ${matchId} non trouvé`);
        }
        const dejaInscrit = adherent.matchs.some((m) => m.id === matchId);
        if (dejaInscrit) {
            throw new common_1.BadRequestException('Vous êtes déjà inscrit à ce match');
        }
        adherent.matchs.push(match);
        await this.adherentRepository.save(adherent);
        return { message: `Inscription au match contre ${match.equipeAdverse} confirmée` };
    }
    async desinscrireMatch(adherentId, matchId) {
        const adherent = await this.adherentRepository.findOne({
            where: { id: adherentId },
            relations: ['matchs'],
        });
        if (!adherent) {
            throw new common_1.NotFoundException(`Adhérent avec l'id ${adherentId} non trouvé`);
        }
        const matchIndex = adherent.matchs.findIndex((m) => m.id === matchId);
        if (matchIndex === -1) {
            throw new common_1.BadRequestException("Vous n'êtes pas inscrit à ce match");
        }
        adherent.matchs.splice(matchIndex, 1);
        await this.adherentRepository.save(adherent);
        return { message: 'Désinscription du match confirmée' };
    }
};
exports.AdherentsService = AdherentsService;
exports.AdherentsService = AdherentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(adherent_entity_1.Adherent)),
    __param(1, (0, typeorm_1.InjectRepository)(match_entity_1.Match)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AdherentsService);
//# sourceMappingURL=adherents.service.js.map