import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AdherentsModule } from './adherents/adherents.module';
import { MatchsModule } from './matchs/matchs.module';
import { NewsModule } from './news/news.module';
import { Adherent } from './entities/adherent.entity';
import { Match } from './entities/match.entity';
import { News } from './entities/news.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'hcc.db',
      entities: [Adherent, Match, News],
      synchronize: true,
    }),
    AuthModule,
    AdherentsModule,
    MatchsModule,
    NewsModule,
  ],
})
export class AppModule {}
