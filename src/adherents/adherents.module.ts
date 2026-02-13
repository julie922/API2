import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdherentsService } from './adherents.service';
import { AdherentsController } from './adherents.controller';
import { Adherent } from '../entities/adherent.entity';
import { Match } from '../entities/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Adherent, Match])],
  controllers: [AdherentsController],
  providers: [AdherentsService],
})
export class AdherentsModule {}
