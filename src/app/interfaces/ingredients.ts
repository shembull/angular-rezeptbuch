import {Units} from '../enum/units.enum';

export interface Ingredients {
  title: string;
  amount: number;
  unit: Units;
  category: string;
}
