import { Tratamiento } from '../../tratamientos/entities/tratamiento.entity';
import { Producto } from '../../productos/entities/producto.entity';
export declare class TratamientoMedicamento {
    id: number;
    medicamento: string;
    precio: number;
    cantidad: number;
    total: number;
    fecha: Date;
    tratamiento: Tratamiento;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    producto: Producto;
}
