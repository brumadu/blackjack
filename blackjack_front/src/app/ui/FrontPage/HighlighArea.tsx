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
      staggerChildren: 1,
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
      className="flex flex-col ml-4 px-4 h-fit overflow-hidden bg-slate-primary justify-center rounded-lg text-start"
    >
      {PlayerHighlight.map((item, id) => {
        return (
          <motion.div
            key={item}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className={`${
              id % 2 == 0 ? "bg-slate-primary" : "bg-slate-variant"
            } rounded-sm`}
          >
            {item}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
