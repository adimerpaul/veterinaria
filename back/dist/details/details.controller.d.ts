import { DetailsService } from './details.service';
import { CreateDetailDto } from './dto/create-detail.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';
export declare class DetailsController {
    private readonly detailsService;
    constructor(detailsService: DetailsService);
    create(createDetailDto: CreateDetailDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDetailDto: UpdateDetailDto): string;
    remove(id: string): string;
}
