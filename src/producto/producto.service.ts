import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Producto } from './producto.model';
import { HistorialService } from 'src/historial/historial.service';
import { NotificacionesGateway } from  "../notificaciones/notificaciones"

@Injectable()
export class ProductoService {

    constructor(
        @InjectModel(Producto) private readonly productoRepo: typeof Producto,
        private notificaciones : NotificacionesGateway
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
       
        if (this.validarStock(stockEgreso,producto.umbral,producto.stock)){   
            this.notificaciones.enviarAlertaUmbral();
        }else{
            this.DesminuirStock(stockEgreso, producto);
            await producto.save();
        }

        return producto;
    }
    validarStock(stockEgreso: number,umbral : number,stockActual : number){
        return  stockActual - stockEgreso <= umbral;
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
}