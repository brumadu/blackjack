import { getSessionById } from "@/app/api/sessionAPI";
import Link from "next/link";
import StartGameButton from "@/app/ui/StartGameButton";
import PlayerActionsArea from "@/app/ui/PlayerActionsArea";
import ResetButton from "@/app/ui/ResetButton";
import Clubs from "@/app/assets/clubs";
import Diamonds from "@/app/assets/diamonds";
import Hearts from "@/app/assets/hearts";
import Spades from "@/app/assets/spades";
import BackIcon from "@/app/assets/backIcon";

function suitToIcon(suit: string) {
  switch (suit) {
    case "H":
      return <Hearts />;
    case "D":
      return <Diamonds />;
    case "C":
      return <Clubs />;
    case "S":
      return <Spades />;
  }
}

function cardValueToNumber(card: string) {
  switch (card) {
    case "A":
      return 1;
    case "T":
      return 10;
    case "J":
      return 10;
    case "Q":
      return 10;
    case "K":
      return 10;
    default:
      return Number(card);
  }
}

function calculateHand(handList: any, player: string, status?: any) {
  let numbers: number[] = [];
  handList?.forEach((e: any) => numbers.push(cardValueToNumber(e.values)));
  let firstResult = 0;
  let secondResult = 0;

  console.log(status, player, numbers);

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

async function playerCards(list: any) {
  if (list) {
    const playerHand = await list.map(
      (e: any) =>
        e.suits != "" && (
          <div
            className="border-2 bg-white rounded-xl  max-h-[500px] min-h-[80px] aspect-[2/3] text-center my-4 mx-3 p-2 hover:border-black text-black shadow-md shadow-black"
            key={Math.random()}
          >
            <div className="flex h-1/3">
              {e.values != "T" ? e.values : "10"}
            </div>
            <div className="flex h-1/3 w-100% justify-center">
              {suitToIcon(e.suits)}
            </div>
            <div className="flex h-1/3 w-100%  justify-end items-end">
              {e.values != "T" ? e.values : "10"}
            </div>
          </div>
        )
    );
    return playerHand;
  }
}

async function dealerCards(list: any, status: any) {
  if (status == 1) {
    const firstDraw = list[0];
    const dealerHand = (
      <>
        <div className="rounded-lg max-h-[500px] min-h-[80px] aspect-[2/3] text-center my-4 mx-3 p-2 bg-white border-2 hover:border-black text-black shadow-md shadow-black">
          <div className="flex h-1/3">
            {firstDraw.values != "T" ? firstDraw.values : "10"}
          </div>
          <div className="flex h-1/3 w-100% justify-center">
            {suitToIcon(firstDraw.suits)}
          </div>
          <div className="flex h-1/3 w-100%  justify-end items-end">
            {firstDraw.values != "T" ? firstDraw.values : "10"}
          </div>
        </div>
        <div className="rounded-lg max-h-[500px] min-h-[80px] aspect-[2/3] text-center my-4 mx-3 p-[5px] bg-white border-2 hover:border-black text-black shadow-md shadow-black">
          <div className="border-2 rounded-sm border-red-600 h-100% p-[1px]">
            <div className="bg-red-600 rounded-sm h-100%"></div>
          </div>
        </div>
      </>
    );

    return dealerHand;
  } else if (status > 1) {
    const dealerHand = await list.map((e: any) => (
      <div
        className="rounded-lg max-h-[500px] min-h-[80px] aspect-[2/3] text-center my-4 mx-3 p-2 bg-white border-2 hover:border-black text-black shadow-md shadow-black"
        key={Math.random()}
      >
        <div className="flex h-1/3">{e.values != "T" ? e.values : "10"}</div>
        <div className="flex h-1/3 w-100% justify-center">
          {suitToIcon(e.suits)}
        </div>
        <div className="flex h-1/3 w-100%  justify-end items-end">
          {e.values != "T" ? e.values : "10"}
        </div>
      </div>
    ));
    return dealerHand;
  }
}

function RenderPlayerButtons(props: { list: any; id: string }) {
  switch (props.list.status) {
    case 0:
      return <StartGameButton sessionId={props.id} />;
    case 1:
      return <PlayerActionsArea id={props.id} />;
    case 2:
      return <ResetButton id={props.id} />;
    case 3:
      return <ResetButton id={props.id} />;
    default:
      <></>;
  }
}

export default async function sessionId({
  params,
}: {
  params: { id: string };
}) {
  const sessionData = await getSessionById(params.id);
  const status = sessionData.status;
  const dealerCardList = calculateHand(
    sessionData.dealerHand,
    "dealer",
    sessionData.status
  );
  const playerCardList = calculateHand(
    sessionData.playerHand,
    "player",
    sessionData.status
  );

  function gameResult() {
    if (status > 1) {
      if (Number(playerCardList) > 21) {
        return (
          <div className="bg-opacity-15 rounded bg-black pb-2 text-white">
            you bust
          </div>
        );
      }
      if (Number(dealerCardList) > 21) {
        return (
          <div className="bg-opacity-15 rounded bg-black pb-2 text-white">
            you win
          </div>
        );
      }
      if (playerCardList <= dealerCardList || Number(dealerCardList) == 21) {
        return (
          <div className="bg-opacity-15 rounded bg-black pb-2 text-white">
            you lose
          </div>
        );
      }
      if (playerCardList > dealerCardList) {
        return (
          <div className="bg-opacity-15 rounded bg-black pb-2 text-white">
            you win
          </div>
        );
      }
    }
  }
  return (
    <>
      <header className="flex h-10% items-center justify-start">
        <Link
          href={"/"}
          className="flex items-center justify-center w-[3vw] h-[3vw] aspect-auto rounded  bg-slate-400 hover:bg-opacity-40 shadow-md shadow-black"
        >
          <BackIcon />
        </Link>
      </header>
      <div className="h-85% md-max:h-[250%] rounded-lg bg-gradient-to-b from-green-800 to-green-700 shadow-lg shadow-black sm:text-xl xl:text-3xl xxl:text-6xl">
        <div className="flex w-100% h-1/3 justify-center rounded-3xl">
          <div className="flex flex-col h-100% self-center w-1/3 border-b justify-around">
            <div className="flex h-2/3 w-100% justify-center">
              {dealerCards(sessionData.dealerHand, status)}
            </div>
            <div className="flex max-h-1/3 justify-center items-end">
              {status >= 1 ? "Dealer: " + dealerCardList : <></>}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap h-2/3 max-h-2/3 items-end justify-center pb-20">
          <div className="flex flex-col h-100% self-center w-2/3 justify-evenly text-center">
            <div className="text-6xl w-1/2 self-center mt-3">
              {gameResult()}
            </div>
            <div className="flex h-[45%] justify-center ">
              {playerCards(sessionData.playerHand)}
            </div>
            <div className="flex justify-center items-end  ">
              {status >= 1 ? "Player: " + playerCardList : <></>}
            </div>
            <div className="flex h-[35%] justify-center">
              <RenderPlayerButtons id={params.id} list={sessionData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
