import { deckInterface } from './deckInterface';

let suits = ['C', 'S', 'D', 'H'];
let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];

export function deckList(deckQuantity: number) {
  let list: [deckInterface] = [
    {
      suits: '',
      values: '',
    },
  ];
  for (let i = 0; i < deckQuantity; i++) {
    suits.forEach((suit) => {
      values.forEach((value) => {
        list.push({ suits: suit, values: value });
      });
    });
  }

  return list;
}
