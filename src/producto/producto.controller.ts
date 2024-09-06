import { Controller, Get, Post, Body, Param, BadRequestException, NotFoundException, Patch, Query } from "@nestjs/common";
import { ProductoService } from "../producto/producto.service";

import { Producto } from './producto.model';
import { HistorialService } from "src/historial/historial.service";
import { TipoHistorial } from 'src/historial/tipo.enum';

@Controller("producto")
export class ProductoController {
    productoService: ProductoService;
    historialServicio: HistorialService;
    constructor(productoService: ProductoService , historialServicio: HistorialService ) {
        this.productoService = productoService;
        this.historialServicio = historialServicio;
    }

    @Post("/crear")
    async crearProducto(@Body() producto: Producto): Promise<Producto> {
        return await this.productoService.crear(producto);
    }
    @Get("/obtener/:id")
    async getProducto(@Param('id') id: number){
        return this.productoService.obtenerProducto(id);
    }

    @Get("/obtenerAll")
    async getAll(): Promise<Producto[]>{
        return await this.productoService.obtenerProductos();
    }

    @Patch("/ingresoDeStock/:id")
    async ingresoDeStock(@Param('id') id: number, @Body('stockIngresado') stockIngresado: number): Promise<Producto> {

        try {

            this.guardarHistorial(stockIngresado,TipoHistorial.INGRESO,id);
            return await this.productoService.ingresoDeStock(id, stockIngresado);
        }
        catch (error) {
            throw new NotFoundException(`No se pudo dar de alta producto: ${error.message}`);
        }
    }

    @Patch("/egresoDeStock/:id")
    async egresoDeStock(@Param('id') id: number, @Body('stockRetirado') stockRetirado: number): Promise<Producto> {

        try {

            this.guardarHistorial(stockRetirado,TipoHistorial.EGRESO,id);
            return await this.productoService.egresoDeStock(id, stockRetirado);
        }
        catch (error) {
            throw new NotFoundException(`No se pudo dar de baja producto: ${error.message}`);
        }
    }
    

    async guardarHistorial(stock: number, tipo :TipoHistorial, productoID : number ): Promise<void> {
        const fecha = new Date();
        const nombreProducto = this.productoService.obtenerNombreDeProducto(productoID);
        await this.historialServicio.crear(stock,tipo, fecha, productoID );
    }
   



}