import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from '../entities/match.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Injectable()
export class MatchsService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
  ) {}

  async findAll(): Promise<Match[]> {
    return this.matchRepository.find({ relations: ['participants'] });
  }

  async findOne(id: number): Promise<Match> {
    const match = await this.matchRepository.findOne({
      where: { id },
      relations: ['participants'],
    });

    if (!match) {
      throw new NotFoundException(`Match avec l'id ${id} non trouvé`);
    }

    return match;
  }

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    const existingMatch = await this.matchRepository.findOne({
      where: { date: createMatchDto.date },
    });

    if (existingMatch) {
      throw new ConflictException(
        `Un match est déjà prévu à cette date (${createMatchDto.date})`,
      );
    }

    const match = this.matchRepository.create(createMatchDto);
    return this.matchRepository.save(match);
  }

  async update(id: number, updateMatchDto: UpdateMatchDto): Promise<Match> {
    const match = await this.findOne(id);
    Object.assign(match, updateMatchDto);
    return this.matchRepository.save(match);
  }

  async remove(id: number): Promise<{ message: string }> {
    const match = await this.findOne(id);
    await this.matchRepository.remove(match);
    return { message: `Match ${id} supprimé` };
  }
}
