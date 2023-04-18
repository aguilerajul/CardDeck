import { SocketInterface } from '../intefaces/socket-interface';

export interface SocketHandler {
  path: string;
  handler: SocketInterface;
}