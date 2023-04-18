import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { SocketHandler } from '../../domain/entities';

const WEBSOCKET_CORS = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}

export class WebsocketServer extends Server {
  private static io: WebsocketServer;

  constructor(httpServer: any) {
    super(httpServer, {
      cors: WEBSOCKET_CORS
    });
  }

  /**
   * Create a new Websocket instance in case that is not started or inizialized
   * @param { HttpServer } httpServer the http server
   * @returns { WebsocketServer } Websocket instance
   */
  public static getInstance(httpServer?: HttpServer): WebsocketServer {
    if (!WebsocketServer.io) {
      WebsocketServer.io = new WebsocketServer(httpServer);
    }
    return WebsocketServer.io;
  }

  /**
   * Inizialize the socket handlers
   * @param { Array<SocketHandler> } socketHandlers an array with the handlers to be loaded
   */
  public initializeHandlers(socketHandlers: Array<SocketHandler>) {
    socketHandlers.forEach(e => {
      const nameSpace = WebsocketServer.io.of(e.path,
        (socket: Socket) => { e.handler.handleConnection(socket); }
      );
      if (e.handler.middlewareImplementation) {
        nameSpace.use(e.handler.middlewareImplementation);
      }
    });
  }
}