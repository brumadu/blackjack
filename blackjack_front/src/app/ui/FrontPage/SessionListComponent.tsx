"use client";

import SessionList from "./SessionList";
import { motion } from "framer-motion";

export default function SessionListComponent(props: { sessionResponse: any }) {
  return (
    <motion.div className="rounded-lg w-100% bg-slate-secondary ">
      <div className="flex text-3xl h-[4vw] bg-slate-primary rounded-t-lg items-center justify-start pl-1">
        <div className="pl-14 text-white tracking-wider">SESSION LIST</div>
      </div>
      <div className="flex flex-col w-100 h-90% p-2 rounded-b-3xl rounded-t-md items-center">
        <div className="flex w-90% text-slate-300 text-xl gap-2">
          <div className="w-1/2">Session Name</div>
          <div className="w-1/3">Status</div>
          <div className="w-1/6">Deck Quantity</div>
        </div>
        <div className="flex flex-col w-100% h-90% overflow-y-auto scrollbar items-center pt-2">
          <SessionList list={props.sessionResponse} />
        </div>
      </div>
    </motion.div>
  );
}
