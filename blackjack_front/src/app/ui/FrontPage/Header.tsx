"use client";
import { motion } from "framer-motion";

const headerButtonVariants = {
  hover: {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 200,
    },
  },
};

export default function Header() {
  return (
    <header className="flex h-[60%] w-100% justify-center bg-slate-primary ">
      <div className="flex w-[80%] mt-2 justify-between">
        <div className="flex h-100%  gap-8">
          <motion.div
            variants={headerButtonVariants}
            whileHover="hover"
            className="h-[150%] aspect-square rounded-full bg-red-500"
          ></motion.div>
          <motion.div
            variants={headerButtonVariants}
            whileHover="hover"
            className="h-[150%] aspect-square rounded-full bg-red-500"
          ></motion.div>
          <motion.div
            variants={headerButtonVariants}
            whileHover="hover"
            className="h-[150%] aspect-square rounded-full bg-red-500"
          ></motion.div>
        </div>
        <motion.div
          variants={headerButtonVariants}
          whileHover="hover"
          className="flex h-[120%] aspect-square rounded-full bg-red-50"
        ></motion.div>
      </div>
    </header>
  );
}
