export function cardValue(card: string) {
  switch (card) {
    case 'A':
      return 1;
    case 'T':
      return 10;
    case 'J':
      return 10;
    case 'Q':
      return 10;
    case 'K':
      return 10;
    default:
      return Number(card);
  }
}
