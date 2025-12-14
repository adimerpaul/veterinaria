import { FotosService } from './fotos.service';
import { UpdateFotoDto } from './dto/update-foto.dto';
export declare class FotosController {
    private readonly fotosService;
    constructor(fotosService: FotosService);
    create(body: any, file: any): Promise<import("./entities/foto.entity").Foto>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateFotoDto: UpdateFotoDto): string;
    remove(id: string): Promise<import("./entities/foto.entity").Foto>;
}
