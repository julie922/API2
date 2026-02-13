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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adherent = exports.Role = void 0;
const typeorm_1 = require("typeorm");
const match_entity_1 = require("./match.entity");
var Role;
(function (Role) {
    Role["COACH"] = "coach";
    Role["CONTRIBUTEUR"] = "contributeur";
    Role["JOUEUR"] = "joueur";
})(Role || (exports.Role = Role = {}));
let Adherent = class Adherent {
    id;
    nom;
    prenom;
    email;
    motDePasse;
    role;
    valide;
    dateInscription;
    matchs;
};
exports.Adherent = Adherent;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Adherent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Adherent.prototype, "nom", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Adherent.prototype, "prenom", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Adherent.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Adherent.prototype, "motDePasse", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: Role.JOUEUR }),
    __metadata("design:type", String)
], Adherent.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Adherent.prototype, "valide", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Adherent.prototype, "dateInscription", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => match_entity_1.Match, (match) => match.participants),
    (0, typeorm_1.JoinTable)({ name: 'adherent_matchs' }),
    __metadata("design:type", Array)
], Adherent.prototype, "matchs", void 0);
exports.Adherent = Adherent = __decorate([
    (0, typeorm_1.Entity)()
], Adherent);
//# sourceMappingURL=adherent.entity.js.map