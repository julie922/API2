import { Repository } from 'typeorm';
import { News } from '../entities/news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
export declare class NewsService {
    private newsRepository;
    constructor(newsRepository: Repository<News>);
    findAll(): Promise<News[]>;
    findOne(id: number): Promise<News>;
    create(createNewsDto: CreateNewsDto, auteur: string): Promise<News>;
    update(id: number, updateNewsDto: UpdateNewsDto): Promise<News>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
