import { Column, Model, Table, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { TipoHistorial } from "./tipo.enum"
import { Producto } from "../producto/producto.model"

@Table({ tableName: 'historial' ,timestamps: false })
export class Historial extends Model<Historial> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  cantidadStock: number ;

  @Column
  fecha: Date;

  @Column
  tipo: TipoHistorial;

  @ForeignKey(() => Producto)
  @Column
  productoId: number;


  //es un decorador de sequelize-typescript utilizado 
  //para definir una relación de "pertenencia" entre modelos
  
  //Esto configura una relación en el modelo para que puedas acceder 
  //a los datos del Producto desde una instancia de Historial.
  @BelongsTo(() => Producto)
  producto: Producto;

}
