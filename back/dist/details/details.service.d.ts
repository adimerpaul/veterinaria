import { CreateDetailDto } from './dto/create-detail.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';
export declare class DetailsService {
    create(createDetailDto: CreateDetailDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDetailDto: UpdateDetailDto): string;
    remove(id: number): string;
}
