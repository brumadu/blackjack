"use client";

import { useRouter } from "next/navigation";
import { patchPlayerAction } from "../../api/sessionAPI";
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
export default function PlayerActionArea(props: {
  id: string;
  playerList: any;
}) {
  const router = useRouter();

  function handlePlayerAction(id: string, playerAction: string) {
    patchPlayerAction(id, playerAction);
    setTimeout(() => router.refresh(), 500);
  }

  return (
    <div className="flex items-center justify-around text-center w-100% h-[80%] gap-4">
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        className="flex items-center justify-center text-center w-[18vw] h-100% mt-4"
        onClick={() => handlePlayerAction(props.id, "hit")}
      >
        <div className="flex rounded-full shadow-lg shadow-black text-3xl text-center w-[100%] h-[100%] text-black border-4 border-dashed border-black  bg-yellow-400 items-center justify-center hover:border-white">
          HIT
        </div>
      </motion.button>
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        className="flex items-center justify-center text-center w-[18vw] h-100% mt-4"
        onClick={() => handlePlayerAction(props.id, "stand")}
      >
        <div className="flex rounded-full shadow-lg shadow-black text-3xl text-center w-[100%] h-[100%] text-black border-4 border-dashed border-black  bg-red-500 items-center justify-center hover:border-white">
          STAND
        </div>
      </motion.button>
    </div>
  );
}
