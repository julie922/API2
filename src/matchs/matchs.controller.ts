import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { MatchsService } from './matchs.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../entities/adherent.entity';

@Controller('matchs')
export class MatchsController {
  constructor(private readonly matchsService: MatchsService) {}

  @Get()
  findAll() {
    return this.matchsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.matchsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.COACH)
  @Post()
  create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchsService.create(createMatchDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.COACH)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMatchDto: UpdateMatchDto,
  ) {
    return this.matchsService.update(id, updateMatchDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.COACH)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.matchsService.remove(id);
  }
}
