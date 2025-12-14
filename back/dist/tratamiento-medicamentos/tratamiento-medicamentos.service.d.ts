import { CreateTratamientoMedicamentoDto } from './dto/create-tratamiento-medicamento.dto';
import { UpdateTratamientoMedicamentoDto } from './dto/update-tratamiento-medicamento.dto';
export declare class TratamientoMedicamentosService {
    create(createTratamientoMedicamentoDto: CreateTratamientoMedicamentoDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTratamientoMedicamentoDto: UpdateTratamientoMedicamentoDto): string;
    remove(id: number): string;
}
