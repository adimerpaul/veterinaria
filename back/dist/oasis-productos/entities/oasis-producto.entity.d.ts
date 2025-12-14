import { OasisSalesDetalle } from '../../oasis-sales-detalles/entities/oasis-sales-detalle.entity';
export declare class OasisProducto {
    id: number;
    codigo: string;
    nombre: string;
    presentacion: string;
    empresa: string;
    proveedor: string;
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
    details: OasisSalesDetalle[];
}
