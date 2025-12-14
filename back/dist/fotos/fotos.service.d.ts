import { UpdateFotoDto } from './dto/update-foto.dto';
import { Foto } from './entities/foto.entity';
import { Repository } from 'typeorm';
export declare class FotosService {
    private readonly fotoRepository;
    constructor(fotoRepository: Repository<Foto>);
    create(body: any): Promise<Foto>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateFotoDto: UpdateFotoDto): string;
    remove(id: number): Promise<Foto>;
}
