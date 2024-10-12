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
      className="flex items-center justify-center text-center w-[18vw] mt-4"
      onClick={() => handleResetGame()}
    >
      <div className="flex rounded-full  text-center w-[100%] h-[80%] text-white border-4 border-dashed border-black  bg-indigo-800 items-center justify-center shadow-lg shadow-black hover:border-white">
        RESTART
      </div>
    </motion.button>
  );
}
