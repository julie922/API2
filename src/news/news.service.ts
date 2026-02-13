import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from '../entities/news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async findAll(): Promise<News[]> {
    return this.newsRepository.find({
      order: { datePublication: 'DESC' },
    });
  }

  async findOne(id: number): Promise<News> {
    const news = await this.newsRepository.findOne({ where: { id } });

    if (!news) {
      throw new NotFoundException(`Actualité avec l'id ${id} non trouvée`);
    }

    return news;
  }

  async create(createNewsDto: CreateNewsDto, auteur: string): Promise<News> {
    const news = this.newsRepository.create({
      ...createNewsDto,
      auteur,
    });
    return this.newsRepository.save(news);
  }

  async update(id: number, updateNewsDto: UpdateNewsDto): Promise<News> {
    const news = await this.findOne(id);
    Object.assign(news, updateNewsDto);
    return this.newsRepository.save(news);
  }

  async remove(id: number): Promise<{ message: string }> {
    const news = await this.findOne(id);
    await this.newsRepository.remove(news);
    return { message: `Actualité ${id} supprimée` };
  }
}
