"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { postSession } from "../../api/sessionAPI";
import { motion, AnimatePresence } from "framer-motion";

const buttonVariants = {
  hover: {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 200,
    },
  },
};

export default function CreateServerArea() {
  const router = useRouter();

  const [deckQuantity, setDeckQuantity] = useState<number>(6);
  const [serverName, setServerName] = useState(" ");
  const [serverNameError, setServerNameError] = useState(false);

  function handleDeckQuantity(value: number) {
    if (deckQuantity + value > 8 || deckQuantity + value < 4) {
      setDeckQuantity(deckQuantity);
    } else {
      setDeckQuantity(deckQuantity + value);
    }
  }

  function handleCreateServer() {
    if (!serverName || serverName == " " || serverName.length > 20) {
      setServerNameError(true);
    } else {
      setServerNameError(false);
      postSession(serverName, deckQuantity);
      setTimeout(() => router.refresh(), 200);
    }
  }

  return (
    <div className="flex flex-col justify-center h-85%">
      <div className="my-2 w-full ">
        <p className="text-2xl">Session Name</p>
        <motion.div variants={buttonVariants} whileHover="hover">
          <motion.input
            placeholder="Blackjack"
            className={` rounded-lg text-center text-black  w-[10vw] shadow-md shadow-black focus:outline-none ${
              serverNameError && "border-red-600"
            }`}
            onChange={(e) => setServerName(e.target.value)}
          ></motion.input>
        </motion.div>
      </div>
      <div className="my-4 mb-8 w-full">
        <p className="text-2xl">Quantity of Decks</p>
        <div className="flex justify-center w-full text-black gap-6 ">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            className="text-center rounded-xl bg-slate-primary w-8  text-white shadow-md shadow-black hover:border-[3px] hover:border-dashed"
            onClick={() => handleDeckQuantity(-1)}
          >
            -
          </motion.button>
          <motion.div variants={buttonVariants} whileHover="hover">
            <input
              className="border-2 rounded-lg text-center w-[10vw] shadow-md shadow-black hover:border-white focus:outline-none"
              inputMode="numeric"
              pattern="[0-9].+"
              maxLength={20}
              onKeyUp={(e) => {
                if (Number(e.key) >= 4 && Number(e.key) <= 8) {
                  setDeckQuantity(Number(e.key));
                }
              }}
              value={deckQuantity}
              type="text"
              min="4"
              max="8"
            ></input>
          </motion.div>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            className="text-center rounded-xl bg-slate-primary w-8  text-white shadow-md shadow-black hover:border-[3px] hover:border-dashed"
            onClick={() => handleDeckQuantity(1)}
          >
            +
          </motion.button>
        </div>
      </div>
      <motion.div
        variants={buttonVariants}
        whileHover="hover"
        className="rounded-lg w-90% self-center bg-slate-800  p-[1px] shadow-md shadow-black hover:border-[3px] hover:border-dashed"
      >
        <motion.button
          className="rounded-lg w-full h-10 bg-slate-primary   text-white"
          onClick={() => handleCreateServer()}
        >
          Create Session
        </motion.button>
      </motion.div>
    </div>
  );
}
