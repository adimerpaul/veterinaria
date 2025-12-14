"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./users/users.module");
const productos_module_1 = require("./productos/productos.module");
const mascotas_module_1 = require("./mascotas/mascotas.module");
const sales_module_1 = require("./sales/sales.module");
const details_module_1 = require("./details/details.module");
const documentos_module_1 = require("./documentos/documentos.module");
const permisos_module_1 = require("./permisos/permisos.module");
const user_permisos_module_1 = require("./user-permisos/user-permisos.module");
const vacunas_module_1 = require("./vacunas/vacunas.module");
const desparacitaciones_module_1 = require("./desparacitaciones/desparacitaciones.module");
const historiales_module_1 = require("./historiales/historiales.module");
const tratamientos_module_1 = require("./tratamientos/tratamientos.module");
const tratamiento_medicamentos_module_1 = require("./tratamiento-medicamentos/tratamiento-medicamentos.module");
const fotos_module_1 = require("./fotos/fotos.module");
const oasis_productos_module_1 = require("./oasis-productos/oasis-productos.module");
const oasis_sales_module_1 = require("./oasis-sales/oasis-sales.module");
const oasis_sales_detalles_module_1 = require("./oasis-sales-detalles/oasis-sales-detalles.module");
const reportes_module_1 = require("./reportes/reportes.module");
const laboratorios_module_1 = require("./laboratorios/laboratorios.module");
const purchase_detail_module_1 = require("./purchase-detail/purchase-detail.module");
const purchase_module_1 = require("./purchase/purchase.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: process.env.DB_TYPE,
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT ?? '3306'),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                entities: ['dist/**/*.entity{.ts,.js}'],
                synchronize: false,
                timezone: '-04:00',
            }),
            users_module_1.UsersModule,
            productos_module_1.ProductosModule,
            mascotas_module_1.MascotasModule,
            sales_module_1.SalesModule,
            details_module_1.DetailsModule,
            documentos_module_1.DocumentosModule,
            permisos_module_1.PermisosModule,
            user_permisos_module_1.UserPermisosModule,
            vacunas_module_1.VacunasModule,
            desparacitaciones_module_1.DesparacitacionesModule,
            historiales_module_1.HistorialesModule,
            tratamientos_module_1.TratamientosModule,
            tratamiento_medicamentos_module_1.TratamientoMedicamentosModule,
            fotos_module_1.FotosModule,
            oasis_productos_module_1.OasisProductosModule,
            oasis_sales_module_1.OasisSalesModule,
            oasis_sales_detalles_module_1.OasisSalesDetallesModule,
            reportes_module_1.ReportesModule,
            laboratorios_module_1.LaboratoriosModule,
            purchase_module_1.PurchasesModule,
            purchase_detail_module_1.PurchaseDetailModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map