import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchsService } from './matchs.service';
import { MatchsController } from './matchs.controller';
import { Match } from '../entities/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match])],
  controllers: [MatchsController],
  providers: [MatchsService],
})
export class MatchsModule {}
