import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class NotificacionesGateway {
  @WebSocketServer()
  server: Server;

  enviarAlertaUmbral() {
    this.server.emit('umbral-pasado', { message: 'El umbral ha sido superado.' });
  }
  
}