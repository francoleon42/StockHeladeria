
import { Controller, Get, Post, Body, Param, BadRequestException, NotFoundException, Patch, Query } from "@nestjs/common";
import { Historial } from "./historial.model";
import { HistorialService } from "./historial.service";

@Controller("historial")
export class HistorialController {
    historialServicio : HistorialService ;
    constructor(historialServicio : HistorialService){
        this.historialServicio =  historialServicio;
    }

    @Get("/obtener")
    async obtenerAll(): Promise<Historial[]>{
        return this.historialServicio.obtenerTrazabilidad();

    }
}