import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Historial } from "./historial.model"
import { TipoHistorial } from './tipo.enum';
import { Producto } from 'src/producto/producto.model';


@Injectable()
export class HistorialService {

    constructor(
        @InjectModel(Historial) private readonly historialRepositorio: typeof Historial
    ) { }

    async crear(cantidadStock: number, tipo: TipoHistorial, fecha: Date, productoId: number) {
        const historial = await this.historialRepositorio.create({
            cantidadStock,
            tipo,
            fecha,
            productoId,
        })
        return historial;
    }

    async obtenerTrazabilidad(): Promise<Historial[]> {
        return await  this.historialRepositorio.findAll({
                include: [{

                    model: Producto,
                    attributes: ['nombre']
                }
                ]
            });
    }


}