import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { AdherentsService } from './adherents.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../entities/adherent.entity';

@Controller('adherents')
export class AdherentsController {
  constructor(private readonly adherentsService: AdherentsService) {}

  @Get()
  findAll() {
    return this.adherentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.adherentsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.COACH)
  @Patch(':id/valider')
  validateAdherent(@Param('id', ParseIntPipe) id: number) {
    return this.adherentsService.validateAdherent(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('matchs/:matchId/inscription')
  inscrireMatch(
    @Request() req: { user: { id: number } },
    @Param('matchId', ParseIntPipe) matchId: number,
  ) {
    return this.adherentsService.inscrireMatch(req.user.id, matchId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('matchs/:matchId/desinscription')
  desinscrireMatch(
    @Request() req: { user: { id: number } },
    @Param('matchId', ParseIntPipe) matchId: number,
  ) {
    return this.adherentsService.desinscrireMatch(req.user.id, matchId);
  }
}
