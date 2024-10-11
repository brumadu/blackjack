"use client";
import Profile from "@/app/assets/profile";
import { motion } from "framer-motion";

const headerButtonVariants = {
  rest: {
    scale: 1,
    transition: {
      duration: 1,
      type: "spring",
      stiffness: 200,
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 1,
      type: "spring",
      stiffness: 200,
    },
  },
};

const textButtonVariants = {
  rest: { opacity: 0, ease: "easeOut", duration: 0.2, type: "tween" },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeIn",
    },
  },
};

export default function Header() {
  return (
    <header className="flex h-[60%] w-100% justify-center  ">
      <div className="flex w-[80%] mt-2 justify-between">
        <div className="flex h-100%  gap-8">
          <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="relative  w-100% h-100%"
          >
            <motion.div
              variants={headerButtonVariants}
              whileHover="hover"
              className="flex items-center justify-center h-[150%] aspect-square rounded-full border-4 border-dashed border-red-500 bg-white hover:cursor-pointer shadow-lg shadow-black"
            >
              <div className="flex items-center justify-center bg-red-500 h-100% w-100% rounded-full">
                <div className="flex items-center justify-center h-[70%] w-[70%] text-black text-3xl font-bold bg-white rounded-full">
                  B
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={textButtonVariants}
              className="absolute right-[50%] mr-[-60px] border-white border-2 opacity-100 border-dashed bg-red-500 text-white font-bold rounded-lg mt-3 px-2"
            >
              BLACKJACK
            </motion.div>
          </motion.div>
          <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="relative  w-100% h-100%"
          >
            <motion.div
              variants={headerButtonVariants}
              whileHover="hover"
              className="flex items-center justify-center  h-[150%] aspect-square rounded-full border-4 border-dashed border-slate-secondary bg-white opacity-50 hover:border-blue-500 hover:opacity-100 shadow-md shadow-black"
            >
              <div className="flex items-center justify-center bg-slate-secondary h-100% w-100% rounded-full hover:bg-blue-500  ">
                <div className="flex items-center justify-center h-[70%] w-[70%] text-black text-3xl font-bold bg-white rounded-full hover:cursor-default ">
                  P
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={textButtonVariants}
              className=" text-center  self-center border-white border-2 border-dashed opacity-5  bg-blue-500 text-white  font-bold rounded-lg mt-3 px-2 "
            >
              POKER
            </motion.div>
          </motion.div>
          <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="relative  w-100% h-100%"
          >
            <motion.div
              variants={headerButtonVariants}
              whileHover="hover"
              className="flex  items-center justify-center h-[150%] aspect-square rounded-full border-4 border-dashed border-slate-variant bg-white opacity-50 hover:border-green-500 hover:opacity-100 shadow-md shadow-black"
            >
              <div className="flex items-center justify-center bg-slate-variant h-100% w-100% rounded-full hover:bg-green-500">
                <div className="flex items-center justify-center h-[70%] w-[70%] text-black text-3xl font-bold bg-white rounded-full hover:cursor-default ">
                  R
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={textButtonVariants}
              className="absolute right-[50%] mr-[-55px]  self-center border-white border-2 border-dashed bg-green-500 opacity-50 text-white font-bold rounded-lg mt-3 px-2"
            >
              ROULETTE
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          variants={headerButtonVariants}
          whileHover="hover"
          className="flex h-[150%] aspect-square rounded-full p-2  bg-white border-4 border-slate-variant hover:bg-opacity-40 shadow-md shadow-black"
        >
          <Profile />
        </motion.div>
      </div>
    </header>
  );
}
