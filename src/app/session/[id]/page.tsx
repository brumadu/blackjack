import { getSessionById } from "@/app/api/sessionAPI";
import StartGameButton from "@/app/ui/StartGameButton";
import PlayerActionsArea from "@/app/ui/PlayerActionsArea";
import ResetButton from "@/app/ui/ResetButton";
import Clubs from "@/app/assets/clubs";
import Diamonds from "@/app/assets/diamonds";
import Hearts from "@/app/assets/hearts";
import Spades from "@/app/assets/spades";

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

async function playerCards(list: any) {
  if (list.status >= 1) {
    const playerHand = await list.playerHand.map(
      (e: any) =>
        e.suits != "" && (
          <div
            className="border-2 bg-white rounded-xl h-2/3 max-h-[500px] min-h-[80px] aspect-[2/3] text-center my-4 mx-3 p-2 hover:border-black text-black shadow-md shadow-black"
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

async function dealerCards(list: any) {
  if (list.status == 1) {
    const dealerFirstCard = list.dealerHand[0];
    const dealerHand = (
      <>
        <div
          className="rounded-lg max-h-[500px] min-h-[80px] aspect-[2/3] text-center my-4 mx-3 p-2 bg-white border-2 hover:border-black text-black shadow-md shadow-black"
          key={Math.random()}
        >
          <div className="flex h-1/3">
            {dealerFirstCard.values != "T" ? dealerFirstCard.values : "10"}
          </div>
          <div className="flex h-1/3 w-100% justify-center">
            {suitToIcon(dealerFirstCard.suits)}
          </div>
          <div className="flex h-1/3 w-100%  justify-end items-end">
            {dealerFirstCard.values != "T" ? dealerFirstCard.values : "10"}
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
  } else if (list.status > 1) {
    const dealerHand = await list.dealerHand?.map(
      (e: any) =>
        e.value != "" &&
        e.suits != "" && (
          <div
            className="rounded-lg max-h-[500px] min-h-[80px] aspect-[2/3] text-center my-4 mx-3 p-2 bg-white border-2 hover:border-black text-black shadow-md shadow-black"
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
    return dealerHand;
  }
}

function RenderPlayerButtons(props: {
  list: any;
  id: string;
  gameResult: any;
}) {
  switch (props.list.status) {
    case 0:
      return <StartGameButton sessionId={props.id} />;
    case 1:
      return <PlayerActionsArea id={props.id} gameResult={props.gameResult} />;
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
  let gameResult;
  return (
    <div className="h-85% md-max:h-[250%] rounded-lg bg-gradient-to-b from-green-800 to-green-700 shadow-lg shadow-black sm:text-xl xl:text-3xl xxl:text-6xl">
      <div className="flex w-100% h-1/3 justify-center rounded-3xl">
        <div className="flex flex-col h-100% self-center w-1/3 border-b justify-around">
          <div className="flex h-2/3 w-100% justify-center">
            {dealerCards(sessionData)}
          </div>
          <div className="flex max-h-1/3 justify-center items-end">
            Dealer Value:
          </div>
        </div>
      </div>
      <div className="flex flex-wrap h-2/3 min-h-2/3 items-end justify-center">
        <div className="flex flex-col h-100% self-center w-2/3 justify-around">
          <div className="flex h-[50%] justify-center">
            {playerCards(sessionData)}
          </div>
          <div className="flex max-h-1/3 justify-center items-end ">
            Player Value:
          </div>
          <div className="flex h-[35%] justify-center pb-6">
            <RenderPlayerButtons
              id={params.id}
              list={sessionData}
              gameResult={gameResult}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
