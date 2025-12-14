import { Detail } from '../../details/entities/detail.entity';
import { TratamientoMedicamento } from '../../tratamiento-medicamentos/entities/tratamiento-medicamento.entity';
export declare class Producto {
    id: number;
    codigo: string;
    nombre: string;
    presentacion: string;
    contenido: string;
    tipo: string;
    precioCompra: number;
    precioVenta: number;
    stock: number;
    activo: boolean;
    imagen: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    details: Detail[];
    tratamientoMedicamentos: TratamientoMedicamento[];
}
