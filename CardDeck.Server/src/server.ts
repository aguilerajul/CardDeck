import { Express } from 'express';
import * as dotenv from 'dotenv';
import { RoutingControllersOptions, createExpressServer } from 'routing-controllers';
import { Server, createServer } from 'http';
import { CardSocketHandler } from './infra/handlers';
import { WebsocketServer } from './infra/websockets';
import "reflect-metadata";

dotenv.config();

const port = process.env.PORT || 3000;

const routingControllersOptions: RoutingControllersOptions = {
  routePrefix: 'v1',
  controllers: [`${__dirname}\\app\\controllers\\*.controller.*`],
  validation: true,
  classTransformer: true,
  cors: true,
  defaultErrorHandler: true
}

// Express
const app: Express = createExpressServer(routingControllersOptions);
const httpServer: Server = createServer(app);
// IO Server
const io: WebsocketServer = WebsocketServer.getInstance(httpServer);
io.initializeHandlers([
  { path: '/cards', handler: new CardSocketHandler() }
]);

httpServer.listen(port, () => console.log(`Server started at port: ${port}`));