import { JsonController, Post, Get, Body, Param } from 'routing-controllers';
import { CardService } from '../../libs/services';
import { Card } from '../../domain/entities';
import * as httpStatus from 'http-status';
import { Service } from 'typedi';

@Service()
@JsonController('/cards', { transformResponse: true })
export class CardsController {
  constructor(private readonly cardService: CardService) { }

  @Post('/')
  post(@Body() card: Card) {
    this.cardService.addCard(card);

    return {
      status: httpStatus.OK,
      success: true
    }
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return {
      status: httpStatus.OK,
      success: true,
      body: this.cardService.getCardById(id)
    };
  }
}
