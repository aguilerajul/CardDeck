import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { SocketInterface } from '../../domain/intefaces';


export class GamePlaySocketHandler implements SocketInterface {
  handleConnection(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): void {
    socket.emit('card', 'I\'m playing this card');
  }

  middlewareImplementation?(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, next: any): void {
    return next();
  }
}