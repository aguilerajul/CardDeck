import { Express } from 'express';
import * as dotenv from 'dotenv';
import { RoutingControllersOptions, createExpressServer } from 'routing-controllers';
import { Server, createServer } from 'http';
import { GamePlaySocketHandler } from './infra/handlers';
import { WebsocketServer } from './infra/websockets';

dotenv.config();

const port = process.env.PORT || 3000;

const routingControllersOptions: RoutingControllersOptions = {
  routePrefix: 'v1',
  controllers: [`${__dirname}/modules/http/*.controllers.*`],
  validation: true,
  classTransformer: true,
  cors: true,
  defaultErrorHandler: true
}

// Express
const app: Express = createExpressServer(routingControllersOptions);

// IO Server
const httpServer: Server = createServer(app);
const io: WebsocketServer = WebsocketServer.getInstance(httpServer);
io.initializeHandlers([
  { path: '/gamePlay', handler: new GamePlaySocketHandler() }
]);

httpServer.listen(port, () => console.log(`Server started at port: ${port}`));