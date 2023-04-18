import { JsonController, Post, Body } from 'routing-controllers';
import { GamePlayService } from '../../libs/services';
import { Card } from '../../domain/entities';
import * as httpStatus from 'http-status';

@JsonController('/gamePlay', { transformResponse: true })
export class GamePlayController {

  private gamePlayservice: GamePlayService;

  constructor() {
    this.gamePlayservice = new GamePlayService();
  }

  @Post('/')
  post(@Body() card: Card) {
    this.gamePlayservice.addCard(card);

    return {
      status: httpStatus.OK,
      success: true
    }
  }
}
