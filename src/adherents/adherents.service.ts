import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adherent, Role } from '../entities/adherent.entity';
import { Match } from '../entities/match.entity';

@Injectable()
export class AdherentsService {
  constructor(
    @InjectRepository(Adherent)
    private adherentRepository: Repository<Adherent>,
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
  ) {}

  async findAll(): Promise<Partial<Adherent>[]> {
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

  async findOne(id: number): Promise<Partial<Adherent>> {
    const adherent = await this.adherentRepository.findOne({
      where: { id },
      relations: ['matchs'],
    });

    if (!adherent) {
      throw new NotFoundException(`Adhérent avec l'id ${id} non trouvé`);
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

  async validateAdherent(id: number): Promise<{ message: string }> {
    const adherent = await this.adherentRepository.findOne({
      where: { id },
    });

    if (!adherent) {
      throw new NotFoundException(`Adhérent avec l'id ${id} non trouvé`);
    }

    adherent.valide = true;
    await this.adherentRepository.save(adherent);

    return { message: `Adhérent ${adherent.prenom} ${adherent.nom} validé` };
  }

  async inscrireMatch(
    adherentId: number,
    matchId: number,
  ): Promise<{ message: string }> {
    const adherent = await this.adherentRepository.findOne({
      where: { id: adherentId },
      relations: ['matchs'],
    });

    if (!adherent) {
      throw new NotFoundException(
        `Adhérent avec l'id ${adherentId} non trouvé`,
      );
    }

    if (adherent.role !== Role.JOUEUR) {
      throw new ForbiddenException(
        'Seuls les adhérents ayant le rôle "joueur" peuvent s\'inscrire aux matchs',
      );
    }

    const match = await this.matchRepository.findOne({
      where: { id: matchId },
    });

    if (!match) {
      throw new NotFoundException(`Match avec l'id ${matchId} non trouvé`);
    }

    const dejaInscrit = adherent.matchs.some((m) => m.id === matchId);
    if (dejaInscrit) {
      throw new BadRequestException('Vous êtes déjà inscrit à ce match');
    }

    adherent.matchs.push(match);
    await this.adherentRepository.save(adherent);

    return { message: `Inscription au match contre ${match.equipeAdverse} confirmée` };
  }

  async desinscrireMatch(
    adherentId: number,
    matchId: number,
  ): Promise<{ message: string }> {
    const adherent = await this.adherentRepository.findOne({
      where: { id: adherentId },
      relations: ['matchs'],
    });

    if (!adherent) {
      throw new NotFoundException(
        `Adhérent avec l'id ${adherentId} non trouvé`,
      );
    }

    const matchIndex = adherent.matchs.findIndex((m) => m.id === matchId);
    if (matchIndex === -1) {
      throw new BadRequestException("Vous n'êtes pas inscrit à ce match");
    }

    adherent.matchs.splice(matchIndex, 1);
    await this.adherentRepository.save(adherent);

    return { message: 'Désinscription du match confirmée' };
  }
}
