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
            className="border-2 bg-white rounded-xl w-32 text-center my-4 mx-3 p-2 hover:border-black text-black shadow-md shadow-black"
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
  if (list.status >= 1) {
    const dealerHand = await list.dealerHand?.map(
      (e: any) =>
        e.value != "" &&
        e.suits != "" && (
          <div
            className="rounded-lg w-32 h-2/3 text-center my-4 mx-3 p-2 hover:border-black text-black shadow-md shadow-black"
            key={Math.random()}
          >
            <div className="flex h-1/3">
              {" "}
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
    <div className="container w-100% h-85% rounded-lg  bg-gradient-to-b from-green-800 to-green-700">
      <div className="flex w-100% h-1/3 justify-center rounded-3xl">
        <div className="flex mt-8 h-100% self-center w-1/3 border-b  justify-center">
          {dealerCards(sessionData)}
        </div>
      </div>
      <div>{gameResult}</div>
      <div className="flex h-4/6 items-end justify-center">
        <div className="h-3/4 self-center w-2/3 ">
          <div className="flex h-1/2 justify-center">
            {playerCards(sessionData)}
          </div>
          <div className="flex h-1/2 justify-center items-end ">
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
