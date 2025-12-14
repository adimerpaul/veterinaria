import { TratamientoMedicamentosService } from './tratamiento-medicamentos.service';
import { CreateTratamientoMedicamentoDto } from './dto/create-tratamiento-medicamento.dto';
import { UpdateTratamientoMedicamentoDto } from './dto/update-tratamiento-medicamento.dto';
export declare class TratamientoMedicamentosController {
    private readonly tratamientoMedicamentosService;
    constructor(tratamientoMedicamentosService: TratamientoMedicamentosService);
    create(createTratamientoMedicamentoDto: CreateTratamientoMedicamentoDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTratamientoMedicamentoDto: UpdateTratamientoMedicamentoDto): string;
    remove(id: string): string;
}
