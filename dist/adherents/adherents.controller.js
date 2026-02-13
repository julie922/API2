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
exports.AdherentsController = void 0;
const common_1 = require("@nestjs/common");
const adherents_service_1 = require("./adherents.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const adherent_entity_1 = require("../entities/adherent.entity");
let AdherentsController = class AdherentsController {
    adherentsService;
    constructor(adherentsService) {
        this.adherentsService = adherentsService;
    }
    findAll() {
        return this.adherentsService.findAll();
    }
    findOne(id) {
        return this.adherentsService.findOne(id);
    }
    validateAdherent(id) {
        return this.adherentsService.validateAdherent(id);
    }
    inscrireMatch(req, matchId) {
        return this.adherentsService.inscrireMatch(req.user.id, matchId);
    }
    desinscrireMatch(req, matchId) {
        return this.adherentsService.desinscrireMatch(req.user.id, matchId);
    }
};
exports.AdherentsController = AdherentsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdherentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdherentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(adherent_entity_1.Role.COACH),
    (0, common_1.Patch)(':id/valider'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdherentsController.prototype, "validateAdherent", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('matchs/:matchId/inscription'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('matchId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], AdherentsController.prototype, "inscrireMatch", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('matchs/:matchId/desinscription'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('matchId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], AdherentsController.prototype, "desinscrireMatch", null);
exports.AdherentsController = AdherentsController = __decorate([
    (0, common_1.Controller)('adherents'),
    __metadata("design:paramtypes", [adherents_service_1.AdherentsService])
], AdherentsController);
//# sourceMappingURL=adherents.controller.js.map