import {Ingredient} from './ingredient';

// define data for dialog data exchange
export interface DialogData {
  title: string;
  category?: string;
  unit?: string;
  amount?: string;
  ingredient?: Ingredient;
}
