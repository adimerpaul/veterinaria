import { CreatePurchaseDetailDto } from './dto/create-purchase-detail.dto';
import { UpdatePurchaseDetailDto } from './dto/update-purchase-detail.dto';
export declare class PurchaseDetailService {
    create(createPurchaseDetailDto: CreatePurchaseDetailDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePurchaseDetailDto: UpdatePurchaseDetailDto): string;
    remove(id: number): string;
}
