import { Module } from '@nestjs/common';
import { Historial } from "../historial/historial.model"

import { SequelizeModule } from '@nestjs/sequelize';
import { HistorialService } from "../historial/historial.service";
import { ProductoController } from "../producto/producto.controller"
import { HistorialController } from './historial.controller'; 

@Module({
    imports: [
        SequelizeModule.forFeature([Historial]), // Registrar el modelo Producto para el orm
    ],
    providers: [HistorialService],
    controllers: [HistorialController],
    exports: [HistorialService],
})
export class HistorialModulo {}