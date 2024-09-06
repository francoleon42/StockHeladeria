import { Column, Model, Table, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import { Historial } from "../historial/historial.model"

@Table({ tableName: 'producto' ,timestamps: false })
export class Producto extends Model<Producto> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  nombre: string;

  @Column
  stock: number;

  @Column
  umbral: number;

  @HasMany(() => Historial)
  historiales: Historial[];
}
