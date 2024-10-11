"use client";
import PlayerActionsArea from "./PlayerActionsArea";
import ResetButton from "./ResetButton";
import StartGameButton from "./StartGameButton";
import { motion } from "framer-motion";

import playerCards from "@/app/utils/playerCards";
import GameResultModal from "@/app/utils/GameResultModal";

function RenderPlayerButtons(props: {
  status: any;
  id: string;
  playerList: any;
}) {
  switch (props.status) {
    case 0:
      return (
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0,
              duration: 1,
            },
          }}
          className="flex h-100% w-100% justify-center"
        >
          <StartGameButton sessionId={props.id} />
        </motion.div>
      );
    case 1:
      return (
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 6,
              duration: 1,
            },
          }}
          className="flex h-100% w-100% justify-center"
        >
          <PlayerActionsArea id={props.id} playerList={props.playerList} />
        </motion.div>
      );
    case 2:
      return (
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 6,
              duration: 1,
            },
          }}
          className="flex h-100% w-100% justify-center"
        >
          <ResetButton id={props.id} />
        </motion.div>
      );
    case 3:
      return (
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 6,
              duration: 1,
            },
          }}
          className="flex h-100% w-100% justify-center"
        >
          <ResetButton id={props.id} />
        </motion.div>
      );
    default:
      <></>;
  }
}

function RenderResult(status: any, gameResult: any) {
  if (gameResult == 0) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: "10",
          duration: 2,
          delay: 4,
        }}
        className="flex items-center justify-center self-center  h-[20%] w-[40%] text-6xl mt-4 bg-red-600 rounded-full shadow-lg shadow-black"
      >
        YOU BUST
      </motion.div>
    );
  }
  if (gameResult == 1) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{
          scale: [1.1, 1.2, 1.1],
          y: 0,
          opacity: 1,
        }}
        transition={{
          scale: { repeat: 6, duration: 1 },
          duration: 2,
          delay: 3,
        }}
        className="flex items-center justify-center self-center h-[20%] w-[40%] text-6xl mt-4 bg-yellow-600 rounded-lg shadow-lg shadow-black"
      >
        YOU WIN
      </motion.div>
    );
  }
  if (gameResult == 2) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: "10",
          duration: 2,
          delay: 4,
        }}
        className="flex items-center justify-center self-center h-[20%] w-[40%] mt-4 text-6xl bg-red-600 rounded-full shadow-lg shadow-black"
      >
        YOU LOSE
      </motion.div>
    );
  }
}

export default function PlayerArea(props: {
  id: any;
  playerList: any;
  status: any;
  playerValue: any;
  dealerValue: any;
}) {
  let gameResult;
  if (props.status >= 2) {
    gameResult = GameResultModal(props.playerValue, props.dealerValue);
  }

  return (
    <div className="flex flex-wrap h-2/3 max-h-2/3 items-end justify-center pb-20">
      <div className="flex flex-col h-100% self-center w-2/3 justify-evenly text-center">
        <div className="text-6xl w-1/2 self-center mt-3"></div>
        <div className="flex h-[45%] justify-center ">
          {playerCards(props.playerList, props.status)}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="flex justify-center items-end"
        >
          {props.status >= 1 ? "Player: " + props.playerValue : <></>}
        </motion.div>

        {RenderResult(props.status, gameResult)}

        <div className="flex h-[35%] justify-center">
          <RenderPlayerButtons
            id={props.id}
            status={props.status}
            playerList={props.playerList}
          />
        </div>
      </div>
    </div>
  );
}
