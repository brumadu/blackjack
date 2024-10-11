"use client";

import { useRouter } from "next/navigation";
import { getStartRound } from "../../api/sessionAPI";
import { motion } from "framer-motion";

const buttonVariants = {
  hover: {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 200,
    },
  },
};

export default function StartGameButton(props: { sessionId: string }) {
  const router = useRouter();

  function handleClick() {
    getStartRound(props.sessionId);
    setTimeout(() => router.refresh(), 200);
  }

  return (
    <motion.button
      variants={buttonVariants}
      whileHover="hover"
      className=" border-2 rounded-lg text-center text-black border-black w-1/2 shadow-lg shadow-black hover:border-white"
      onClick={() => handleClick()}
    >
      <div className="flex text-black text-center w-100% h-100% rounded-lg bg-yellow-400 items-center justify-center">
        Start Game
      </div>
    </motion.button>
  );
}
