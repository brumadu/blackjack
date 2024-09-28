import DeckInterface from './DeckInterface';

let suits = ['C', 'S', 'D', 'H'];
let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];

export default function DeckList(deckQuantity: number) {
  let list: [DeckInterface] = [
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
