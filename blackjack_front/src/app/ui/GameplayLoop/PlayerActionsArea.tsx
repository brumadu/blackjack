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
    <div className="flex w-1/2 h-100% text-center gap-8 sm-max:gap-[10px] xxl:text-7xl ">
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        className="border-2 rounded-lg text-center text-black border-black w-1/2 shadow-lg shadow-black hover:border-white bg-blue-600 "
        onClick={() => handlePlayerAction(props.id, "hit")}
      >
        <div className="flex items-center justify-center w-100% h-100%">
          hit
        </div>
      </motion.button>
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        className="border-2 rounded-lg text-center text-black border-black w-1/2 shadow-lg shadow-black hover:border-white bg-red-500 "
        onClick={() => handlePlayerAction(props.id, "stand")}
      >
        <div className="flex items-center justify-center w-100% h-100% ">
          stand
        </div>
      </motion.button>
    </div>
  );
}
