"use client";
import dealerCards from "@/app/utils/dealerCards";
import suitToIcon from "@/app/utils/suitToIcon";
import { animate, motion, useAnimate, useCycle } from "framer-motion";

export default function DealerArea(props: {
  dealerList: any;
  status: any;
  dealerValue: any;
}) {
  return (
    <div className="flex w-100% h-1/3 justify-center">
      <div className="flex flex-col h-100% self-center w-1/2 border-b justify-around">
        <div className="flex h-2/3 w-100% justify-between">
          <div className="flex w-[20%]"></div>
          <div className="flex w-[60%] justify-center">
            {dealerCards(props.dealerList, props.status)}
          </div>
          <div className="flex w-[20%]"></div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex max-h-1/3 justify-center items-end"
        >
          {props.status >= 1 && "Dealer: " + props.dealerValue}
        </motion.div>
      </div>
    </div>
  );
}
