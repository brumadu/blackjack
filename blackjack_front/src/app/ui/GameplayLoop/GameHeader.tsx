"use client";
import BackIcon from "@/app/assets/backIcon";
import { motion } from "framer-motion";
import Link from "next/link";
const headerButtonVariants = {
  hover: {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 200,
    },
  },
};
export default function GameHeader() {
  return (
    <div className="flex h-[10%] w-100% ">
      <header className="flex h-[60%] w-100% justify-center bg-slate-primary ">
        <div className="flex w-[80%] mt-4 justify-between ">
          <motion.div variants={headerButtonVariants} whileHover="hover">
            <Link
              href={"/"}
              className="flex h-[150%] aspect-square rounded-lg  bg-slate-400 hover:bg-opacity-40 shadow-md shadow-black"
            >
              <BackIcon />
            </Link>
          </motion.div>
          <motion.div
            variants={headerButtonVariants}
            whileHover="hover"
            className="flex h-[150%] aspect-square rounded-full bg-red-50"
          ></motion.div>
        </div>
      </header>
    </div>
  );
}
