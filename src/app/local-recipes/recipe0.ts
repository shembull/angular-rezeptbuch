import {Recipe} from '../interfaces/recipe';
import {chillischote, knoblauchzehe, olivenoel, petersilie, spaghetti, zitrone} from '../local-ingrdients/ingredient_file';


export const recipe0: Recipe = {
  amounts: new Map<string, number>(),
  description: ' Die Spaghetti in Salzwasser bissfest kochen. \n' +
    '\n' +
    'Inzwischen die Knoblauchzehen abziehen und in Scheiben schneiden. Die Petersilie waschen, trocken schütteln und die Blättchen abzupfen. Die Chilischoten zerstoßen. Die Zitrone heiß waschen und in Scheiben schneiden. \n' +
    '\n' +
    'Die Spaghetti abgießen und abtropfen lassen. \n' +
    '\n' +
    'In einer großen Pfanne das Olivenöl erhitzen. Knoblauch, Petersilienblättchen und Chili kurz darin anbraten, die Zitronenscheiben dazugeben und mitbraten. Die Spaghetti dazugeben und darin schwenken. Mit Meersalz und Pfeffer würzen.  ',
  id: '0',
  ingredients: [spaghetti, knoblauchzehe, petersilie, chillischote, olivenoel, zitrone],
  pictures: ['https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
    'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg'],
  time: 15,
  title: 'Spaghetti aglio olio'};

