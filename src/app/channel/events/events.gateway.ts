import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { onlineMap } from '@app/channel/events/online-map';

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  socket: Socket;

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log('메세지 발송됨:', body);
  }

  afterInit(server: any): any {
    console.log('WS Init', '\n');
  }

  handleConnection(@ConnectedSocket() socket: Socket): any {
    console.log('WS Connected', socket.nsp.name);
    if (!onlineMap[socket.nsp.name]) {
      onlineMap[socket.nsp.name] = {};
    }
    console.log('onlineMap', onlineMap, '\n');
    socket.emit('online', onlineMap[socket.nsp.name]);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket): any {
    console.log('WS Disconnected', socket.nsp.name, '\n');
    const newNamespace = socket.nsp;
    delete onlineMap[socket.nsp.name][socket.id];
    newNamespace.emit('onlineList', Object.values(onlineMap[socket.nsp.name]));
  }
}
