import { PurchaseDetailService } from './purchase-detail.service';
import { CreatePurchaseDetailDto } from './dto/create-purchase-detail.dto';
import { UpdatePurchaseDetailDto } from './dto/update-purchase-detail.dto';
export declare class PurchaseDetailController {
    private readonly purchaseDetailService;
    constructor(purchaseDetailService: PurchaseDetailService);
    create(createPurchaseDetailDto: CreatePurchaseDetailDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePurchaseDetailDto: UpdatePurchaseDetailDto): string;
    remove(id: string): string;
}
