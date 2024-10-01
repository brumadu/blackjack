import { getSessionById } from "@/app/api/sessionAPI";
import StartGameButton from "@/app/ui/StartGameButton";
import PlayerActionsArea from "@/app/ui/PlayerActionsArea";
import ResetButton from "@/app/ui/ResetButton";
import Image from "next/image";

async function playerCards(list: any, id: string) {
  if (list.status >= 1) {
    const playerHand = await list.playerHand.map(
      (e: any) =>
        e.suits != "" && (
          <div
            className="border-2 rounded-3xl w-32 text-center my-4 mx-3 p-2 hover:bg-slate-600"
            key={Math.random()}
          >
            <div></div>
            <div>{e.values}</div>
          </div>
        )
    );
    return playerHand;
  }
}

async function dealerCards(list: any) {
  if (list.status >= 1) {
    console.log(list);
    const dealerHand = await list.dealerHand?.map(
      (e: any) =>
        e.value != "" &&
        e.suits != "" && (
          <div
            className=" border-2 rounded-3xl w-32 h-32 text-center my-4 mx-3 p-2 hover:bg-slate-600"
            key={Math.random()}
          >
            <div>{e.suits}</div>
            <div>{e.values}</div>
          </div>
        )
    );
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
  return (
    <div className="container w-full h-85% box-border border-2 rounded-3xl  bg-gradient-to-b from-green-800 to-green-700">
      <div className="flex w-full h-1/3 justify-center rounded-3xl">
        <div className="flex box-border h-full self-center w-1/3 border-2 rounded-3xl justify-center">
          {dealerCards(sessionData)}
        </div>
      </div>
      <div className="flex h-4/6 items-end justify-center">
        <div className="h-3/4 self-center w-2/3 ">
          <div className="flex h-1/2 justify-center">
            {playerCards(sessionData, params.id)}
          </div>
          <div className="flex h-1/2 justify-center items-end ">
            <RenderPlayerButtons id={params.id} list={sessionData} />
          </div>
        </div>
      </div>
    </div>
  );
}
