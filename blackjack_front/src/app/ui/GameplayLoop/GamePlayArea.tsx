"use client";
import calculateHand from "@/app/utils/calculateHand";
import DealerArea from "./DealerArea";
import PlayerArea from "./PlayerArea";

export default function GamePlayArea(props: { session: any }) {
  const status = props.session.status;
  const dealerHand = props.session.dealerHand;
  const playerHand = props.session.playerHand;

  const dealerCardList = calculateHand(dealerHand, "dealer", status);
  const playerCardList = calculateHand(
    playerHand,
    "player",
    props.session.status
  );

  return (
    <div className="h-85% border-8 border-dashed border-slate-primary w-[80%] md-max:h-[250%] bg-gradient-to-b from-green-800 to-green-700 shadow-2xl shadow-black sm:text-xl xl:text-3xl xxl:text-6xl">
      <DealerArea
        dealerList={dealerHand}
        status={status}
        dealerValue={dealerCardList}
      />
      <PlayerArea
        playerList={playerHand}
        status={status}
        playerValue={playerCardList}
        id={props.session.id}
        dealerValue={dealerCardList}
      ></PlayerArea>
    </div>
  );
}
