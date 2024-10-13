"use client";

import { PlayerHighlight } from "@/app/utils/PlayerHighlights";
import { AnimatePresence, useScroll, motion, useInView } from "framer-motion";
import React from "react";
import { useEffect, useMemo, useRef, useState } from "react";

const itemVariants = {
  hidden: {
    x: -20,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delayChildren: 1,
      staggerChildren: 5,
    },
  },
  exit: { opacity: 0, height: 0 },
};

export default function HighlightArea() {
  return (
    <motion.div
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={itemVariants}
      transition={{ duration: 0.5 }}
      className="flex flex-col-reverse scrollbar overflow-y-scroll text-white ml-4 px-4 h-100% bg-slate-primary justify-start rounded-lg text-start shadow-lg shadow-black"
    >
      <AnimatePresence mode="wait">
        {PlayerHighlight.map((item, id) => {
          return (
            <motion.div
              key={item}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className={`flex ${
                id % 2 == 0
                  ? "bg-slate-primary font-sans "
                  : "bg-slate-variant  font-sans"
              } rounded-sm w-100% p-4`}
            >
              <div
                className={`flex self-center justify-center mb-1  ${
                  id % 2 == 0 ? "bg-red-500" : "bg-green-500"
                } border-dashed border-2 h-[3vh] aspect-square rounded-full`}
              >
                <div className="flex self-center justify-center items-center h-[2vh] aspect-square text-black font-bold bg-white text-sm rounded-full">
                  B
                </div>
              </div>
              <div className="w-90% px-4">{item}</div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}
