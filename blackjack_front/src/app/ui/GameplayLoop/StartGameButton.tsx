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
      className="flex items-end w-[18vw] h-[10vh] hover:border-white"
      onClick={() => handleClick()}
    >
      <div className="flex rounded-full shadow-lg shadow-black text-3xl text-center w-[100%] h-[100%] text-black border-4 border-dashed border-black  bg-yellow-500 items-center justify-center hover:border-white">
        START GAME
      </div>
    </motion.button>
  );
}
