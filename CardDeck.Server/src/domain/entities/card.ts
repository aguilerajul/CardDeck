import { Ability } from './ability';

export interface Card {
  id: string;
  name: string;
  abilities: Ability[];
}