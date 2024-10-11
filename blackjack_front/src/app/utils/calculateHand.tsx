import cardValueToNumber from "./cardValueToNumber";

export default function calculateHand(
  handList: any,
  player: string,
  status?: any
) {
  const numbers: number[] = [];
  handList?.forEach((e: any) => numbers.push(cardValueToNumber(e.values)));
  let firstResult = 0;
  let secondResult = 0;

  if (status == 1 && player == "dealer") {
    if (numbers[0] == 1) {
      return "1 or 11";
    }
    return numbers[0];
  }

  numbers.forEach((num) => {
    firstResult += num;
  });
  if (numbers.find((e) => e == 1)) {
    numbers[numbers.findIndex((e) => e == 1)] = 11;
    numbers.forEach((num) => {
      secondResult += num;
    });
  }

  if (secondResult != 0 && secondResult <= 21 && status == 1) {
    return firstResult + " or " + secondResult;
  }

  if (firstResult < secondResult && secondResult <= 21) {
    return secondResult;
  }

  return firstResult;
}
