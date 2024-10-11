"use client";

import SessionList from "./SessionList";
import { motion } from "framer-motion";

export default function SessionListComponent(props: { sessionResponse: any }) {
  return (
    <motion.div className="rounded-lg w-100% bg-slate-secondary ">
      <div className="flex text-3xl h-[4vw] bg-slate-primary rounded-t-lg items-center justify-center w-100%">
        <div className=" w-90% pl-2 text-white tracking-wider">
          SESSION LIST
        </div>
      </div>
      <div className="flex flex-col h-90% p-2 rounded-b-3xl rounded-t-md items-center">
        <div className="grid grid-cols-3 w-[90%] pl-2 h-100 text-center text-xl text-[#aaaaaa] font-bold">
          <div className="col-span-1">Session Name</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Deck Quantity</div>
        </div>
        <div className="flex flex-col w-100% h-90% overflow-y-auto scrollbar items-center pt-2">
          <SessionList list={props.sessionResponse} />
        </div>
      </div>
    </motion.div>
  );
}
