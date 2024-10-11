"use client";

import { useRouter } from "next/navigation";
import { patchClearHand } from "../../api/sessionAPI";
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
export default function ResetButton(props: { id: string }) {
  const router = useRouter();
  function handleResetGame() {
    patchClearHand(props.id);
    setTimeout(() => router.refresh(), 1000);
  }

  return (
    <motion.button
      variants={buttonVariants}
      whileHover="hover"
      className="border-2 rounded-lg text-center text-black h-[80%] self-end border-black w-1/2 shadow-lg shadow-black hover:border-white"
      onClick={() => handleResetGame()}
    >
      <div className="flex text-black text-center w-100% h-100% rounded-lg bg-blue-500 items-center justify-center">
        reset game
      </div>
    </motion.button>
  );
}
