"use client";

import { motion } from "framer-motion";
import suitToIcon from "./suitToIcon";

export default function playerCards(list: any, status: any) {
  if (list.length == 2 && status == 1) {
    return list.map((e: any, index: number) => {
      return (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 3 * index, duration: 1 }}
          className="border-2 bg-white rounded-xl  max-h-[500px] min-h-[80px] aspect-[2/3] text-center my-4 mx-3 p-2 hover:border-black text-black shadow-md shadow-black"
          key={Math.random()}
        >
          <div className="flex h-1/3">{e.values != "T" ? e.values : "10"}</div>
          <div className="flex h-1/3 w-100% justify-center">
            {suitToIcon(e.suits)}
          </div>
          <div className="flex h-1/3 w-100%  justify-end items-end">
            {e.values != "T" ? e.values : "10"}
          </div>
        </motion.div>
      );
    });
  } else {
    return list.map((e: any, index: number) => {
      if (list.length - 1 == index) {
        return (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="border-2 bg-white rounded-xl  max-h-[500px] min-h-[80px] aspect-[2/3] text-center my-4 mx-3 p-2 hover:border-black text-black shadow-md shadow-black"
            key={Math.random()}
          >
            <div className="flex h-1/3">
              {e.values != "T" ? e.values : "10"}
            </div>
            <div className="flex h-1/3 w-100% justify-center">
              {suitToIcon(e.suits)}
            </div>
            <div className="flex h-1/3 w-100%  justify-end items-end">
              {e.values != "T" ? e.values : "10"}
            </div>
          </motion.div>
        );
      } else {
        return (
          <div
            className="border-2 bg-white rounded-xl  max-h-[500px] min-h-[80px] aspect-[2/3] text-center my-4 mx-3 p-2 hover:border-black text-black shadow-md shadow-black"
            key={Math.random()}
          >
            <div className="flex h-1/3">
              {e.values != "T" ? e.values : "10"}
            </div>
            <div className="flex h-1/3 w-100% justify-center">
              {suitToIcon(e.suits)}
            </div>
            <div className="flex h-1/3 w-100%  justify-end items-end">
              {e.values != "T" ? e.values : "10"}
            </div>
          </div>
        );
      }
    });
  }
}
