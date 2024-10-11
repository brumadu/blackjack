export default function GameResultModal(playerCards: any, dealerCards: any) {
  if (playerCards > 21) {
    return 0;
  }
  if (dealerCards > 21) {
    return 1;
  }
  if (playerCards <= dealerCards || dealerCards == 21) {
    return 2;
  }
  if (playerCards > dealerCards) {
    return 1;
  }
}
