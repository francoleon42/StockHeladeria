import { Module } from '@nestjs/common';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';
import { Producto } from "./producto.model";
import { SequelizeModule } from '@nestjs/sequelize';

import { HistorialModulo } from 'src/historial/historial.modulo';


@Module({
    imports: [
        SequelizeModule.forFeature([Producto]),// Registrar el modelo Producto
        HistorialModulo
    ],
    controllers: [ProductoController],
    providers: [ProductoService],
})
export class ProductoModule { }
