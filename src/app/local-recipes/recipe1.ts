import {Recipe} from '../interfaces/recipe';
import {backKakao, butter, ei, mehl, schokolade, vanillezucker, zucker} from '../local-ingrdients/ingredient_file';

export const recipe1: Recipe = {
  amounts: new Map<string, number>(),
  description: ' Als erstes den Zucker mit den Eiern schaumig rühren. Dann das Mehl, den Vanillezucker sowie Kakao hinzugeben und gut vermischen.\n' +
    'In der Zwischenzeit die Butter und Schokolade in einem Topf schmelzen.\n' +
    'Die Schokoladenmasse nun mit dem Teig vermischen.\n' +
    'Den angerührten Teig auf einem Backblech verteilen und für 20 bis 25 Minuten bei 180°C Heißluft backen. ',
  id: '1',
  ingredients: [zucker, backKakao, vanillezucker, mehl, butter, ei, schokolade],
  pictures: ['https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg',
    'https://images.pexels.com/photos/1931462/pexels-photo-1931462.jpeg'],
  time: 30,
  title: 'Brownies'};

