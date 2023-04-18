import { Card } from '../../domain/entities';
import { WebsocketServer } from '../../infra/websockets';

export class GamePlayService {
  public addCard(card: Card) {
    // Should save in the database, maybe :P
    // update the browser
    this.updateSockets(card);
  }

  private updateSockets(card: Card) {
    const io = WebsocketServer.getInstance();
    io.of('card').emit('card added', { data: [card] });
  }
}