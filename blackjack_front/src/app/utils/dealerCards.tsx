"use client";

import { motion } from "framer-motion";
import suitToIcon from "./suitToIcon";

export default function DealerCards(list: any, status: any) {
  let dealerHand;
  if (status == 1) {
    const firstDraw = list[0];
    dealerHand = (
      <div className="flex h-100% w-100% justify-center">
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="rounded-lg max-h-[500px] min-h-[80px] aspect-[2/3] text-center my-4 mx-3 p-2 bg-white border-2 hover:border-black text-black shadow-md shadow-black"
        >
          <div className="flex h-1/3">
            {firstDraw.values != "T" ? firstDraw.values : "10"}
          </div>
          <div className="flex h-1/3 w-100% justify-center">
            {suitToIcon(firstDraw.suits)}
          </div>
          <div className="flex h-1/3 w-100%  justify-end items-end">
            {firstDraw.values != "T" ? firstDraw.values : "10"}
          </div>
        </motion.div>
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 4.5, duration: 1 }}
          className="rounded-lg max-h-[500px] min-h-[80px] aspect-[2/3] text-center my-4 mx-3 p-[5px] bg-white border-2 hover:border-black text-black shadow-md shadow-black"
        >
          <div className="border-2 rounded-sm border-red-600 h-100% p-[1px]">
            <div className="bg-red-600 rounded-sm h-100%"></div>
          </div>
        </motion.div>
      </div>
    );
  } else if (status > 1) {
    dealerHand = list.map((e: any, index: number) => {
      if (list.length - 1 == index) {
        return (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
            className="rounded-lg max-h-[500px] min-h-[80px] aspect-[2/3] text-center my-4 mx-3 p-2 bg-white border-2 hover:border-black text-black shadow-md shadow-black"
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
          <div className="rounded-lg max-h-[500px] min-h-[80px] aspect-[2/3] text-center my-4 mx-3 p-2 bg-white border-2 hover:border-black text-black shadow-md shadow-black">
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
  return dealerHand;
}
