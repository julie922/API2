import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
    findAll(): Promise<import("../entities/news.entity").News[]>;
    findOne(id: number): Promise<import("../entities/news.entity").News>;
    create(createNewsDto: CreateNewsDto, req: {
        user: {
            email: string;
        };
    }): Promise<import("../entities/news.entity").News>;
    update(id: number, updateNewsDto: UpdateNewsDto): Promise<import("../entities/news.entity").News>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
