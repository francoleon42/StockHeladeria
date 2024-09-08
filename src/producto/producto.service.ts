import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Producto } from './producto.model';
import { HistorialService } from 'src/historial/historial.service';
import { Op, Sequelize } from 'sequelize';



@Injectable()
export class ProductoService {

    constructor(
        @InjectModel(Producto) private readonly productoRepo: typeof Producto,

    ) { }

    async crear(producto: Producto): Promise<Producto> {
        return await this.productoRepo.create(producto);
    }

    async ingresoDeStock(id: number, stockIngresado: number): Promise<Producto> {
        const producto = await this.productoRepo.findByPk(id);
        if (!producto) {
            throw new NotFoundException(`Producto con ID ${id} no encontrado`);
        }
        this.aumentarStock(stockIngresado, producto);

        await producto.save();

        return producto;
    }


    async egresoDeStock(id: number, stockEgreso: number): Promise<Producto> {
        const producto = await this.productoRepo.findByPk(id);
        if (!producto) {
            throw new NotFoundException(`Producto con ID ${id} no encontrado`);
        }

        if (this.validarStock(stockEgreso, producto.stock)) {
            this.DesminuirStock(stockEgreso, producto);
            await producto.save();
        }


        return producto;
    }

    validarStock(stockEgreso: number, stockActual: number) {
        return stockActual - stockEgreso > 0;
    }

    aumentarStock(stockIngresado: number, productoActual: Producto) {
        productoActual.stock = productoActual.stock + stockIngresado;
    }
    DesminuirStock(stockIngresado: number, productoActual: Producto) {
        productoActual.stock = productoActual.stock - stockIngresado;
    }
    async obtenerProducto(id: number): Promise<Producto> {
        return await this.productoRepo.findByPk(id);
    }

    async obtenerProductos(): Promise<Producto[]> {
        return await this.productoRepo.findAll();
    }
    async obtenerNombreDeProducto(id: number): Promise<string> {
        return (await this.productoRepo.findByPk(id))?.nombre;
    }
    async obtenerProductosBajoStock(): Promise<Producto[]> {
        return this.productoRepo.findAll({
            where: {
                stock: {
                    [Op.lt]: Sequelize.col('umbral') // Filtra productos con stock menor que el umbral del producto
                } // Filtra productos con stock menor a 10
            }
        });
    }

}
