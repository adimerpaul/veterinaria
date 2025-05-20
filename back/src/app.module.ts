import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductosModule } from './productos/productos.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { SalesModule } from './sales/sales.module';
import { DetailsModule } from './details/details.module';
import { DocumentosModule } from './documentos/documentos.module';
import { PermisosModule } from './permisos/permisos.module';
import { UserPermisosModule } from './user-permisos/user-permisos.module';
import { VacunasModule } from './vacunas/vacunas.module';
import { DesparacitacionesModule } from './desparacitaciones/desparacitaciones.module';
import { HistorialesModule } from './historiales/historiales.module';
import { TratamientosModule } from './tratamientos/tratamientos.module';
import { TratamientoMedicamentosModule } from './tratamiento-medicamentos/tratamiento-medicamentos.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '3306'),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: process.env.DB_SYNC === 'true',
      timezone: '-04:00',
    }),
    UsersModule,
    ProductosModule,
    MascotasModule,
    SalesModule,
    DetailsModule,
    DocumentosModule,
    PermisosModule,
    UserPermisosModule,
    VacunasModule,
    DesparacitacionesModule,
    HistorialesModule,
    TratamientosModule,
    TratamientoMedicamentosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
