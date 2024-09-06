import { Module } from '@nestjs/common';
import { ProductoModule } from './producto/producto.module';
import { HistorialModulo } from './historial/historial.modulo';
import { Producto } from './producto/producto.model';
import { Historial } from './historial/historial.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST, // Host de la base de datos desde el .env
      port: parseInt(process.env.DB_PORT, 10), // Puerto de la base de datos desde el .env
      username: process.env.DB_USERNAME, // Usuario de la base de datos desde el .env
      password: process.env.DB_PASSWORD, // Contraseña de la base de datos desde el .env
      database: process.env.DB_NAME, // Nombre de la base de datos desde el .env
      models: [Producto, Historial], // Modelos a cargar
      autoLoadModels: true, // Carga automática de los modelos
      synchronize: true, // Úsalo con precaución en producción
    }),
    ProductoModule,
    HistorialModulo,
  ],
})
export class AppModule {}
