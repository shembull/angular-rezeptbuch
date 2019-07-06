import {Ingredient} from './ingredient';

export interface DialogData {
  title: string;
  category?: string;
  unit?: string;
  amount?: string;
  ingredient?: Ingredient;
}
