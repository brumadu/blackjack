import { getSessionById, getStartRound } from "@/app/api/sessionAPI";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import StartGameButton from "@/app/ui/StartGameButton";
import PlayerActionsArea from "@/app/ui/PlayerActionsArea";
import ResetButton from "@/app/ui/ResetButton";

function playerCards(list: any, id: string) {
  if (list.status == 1) {
    return <StartGameButton sessionId={id} />;
  } else {
    let playerHand = list.user.playerHand.map(
      (e: any) =>
        e.suits != "" && (
          <div className="border-2 rounded-3xl w-32 text-center my-4 mx-3 p-2 hover:bg-slate-600">
            <div>{e.suits}</div>
            <div>{e.values}</div>
          </div>
        )
    );
    return playerHand;
  }
}

function dealerCards(list: any) {
  let dealerHand = list.dealerHand.map(
    (e: any) =>
      e.value != "" &&
      e.suits != "" && (
        <div className=" border-2 rounded-3xl w-32 h-32 text-center my-4 mx-3 p-2 hover:bg-slate-600">
          <div>{e.suits}</div>
          <div>{e.values}</div>
        </div>
      )
  );
  return dealerHand;
}

function RenderPlayerButtons(props: { list: any; id: string }) {
  if (props.list.status == 2) {
    return <PlayerActionsArea id={props.id} />;
  }
  if (props.list.status == 4) {
    return <ResetButton id={props.id} />;
  }
  return <></>;
}

export default async function sessionId({
  params,
}: {
  params: { id: string };
}) {
  let sessionData = await getSessionById(params.id);
  // let list = patchPlayerAction();
  return (
    <div className="container w-full h-85% box-border border-2 rounded-3xl">
      <div className="flex w-full h-1/3 justify-center rounded-3xl">
        <div className="flex box-border h-full self-center w-1/3 border-2 rounded-3xl justify-center">
          {dealerCards(sessionData)}
        </div>
      </div>
      <div className="flex h-4/6 items-end justify-center">
        <div className="box-border h-3/4 self-center w-2/3 border-2 rounded-3xl">
          <div className="flex h-1/2 justify-center">
            {playerCards(sessionData, params.id)}
          </div>
          <div className="flex h-1/2 justify-center items-end gap-10">
            <RenderPlayerButtons id={params.id} list={sessionData} />
          </div>
        </div>
      </div>
    </div>
  );
}
