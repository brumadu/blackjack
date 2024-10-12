"use client";

import { PlayerHighlight } from "@/app/utils/PlayerHighlights";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HighlightArea() {
  return (
    <AnimatePresence initial={false}>
      {PlayerHighlight.map((todo) => (
        <motion.li
          key={todo}
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          style={{ overflow: "hidden" }}
        >
          {todo}
        </motion.li>
      ))}
    </AnimatePresence>
  );
}
