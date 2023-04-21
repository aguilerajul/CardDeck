import { Card } from '../../domain/entities';
import { Service } from "typedi";
import { WebsocketServer } from '../../infra/websockets';
import { Ability } from '../../domain/entities/ability';
import { ulid } from 'ulid'

@Service()
export class CardService {
  public addCard(card: Card) {
    // Should save in the database, maybe :P
    // update the browser
    var newCard = {
      ...card,
      id: card.id ?? ulid()
    };
    this.updateSockets(newCard);
  }

  public getCardById(cardId: string): Card {
    // Should get it from database, maybe :P
    return {
      id: 'id1',
      abilities: [{
        id: 'abilityId1',
        name: 'Bombazo',
        power: 20
      }] as Ability[],
      name: 'ElMatao'
    } as Card;
  }

  private updateSockets(card: Card) {
    const io = WebsocketServer.getInstance();
    io.of('card').emit('card added', { data: [card] });
  }
}