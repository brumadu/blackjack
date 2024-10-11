"use client";
import { motion } from "framer-motion";
import Link from "next/link";

function statusEnum(status: number) {
  switch (status) {
    case 1:
      return "Started";
    case 2:
      return "Player done";
    case 3:
      return "Finished";
    case 4:
      return "Player Hit";
    default:
      return "Waiting";
  }
}

export default function SessionList(props: { list: any }) {
  let session;
  if (props.list.statusCode != 404) {
    session = props.list.map((session: any, i: number) => (
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
        className={`flex w-90% h-10 justify-around text-start rounded pl-2 mb-2 items-center shadow-md shadow-black  ${
          i % 2 == 0 ? "bg-slate-primary" : "bg-slate-variant"
        }`}
        key={i}
      >
        <Link
          className="grid grid-cols-6 w-100% h-100"
          href={`/session/${session.id}`}
        >
          <div className="col-span-3">{session.title}</div>
          <div className="col-span-2">{statusEnum(session.status)}</div>
          <div className="col-span-1">{session.deckQuantity}</div>
        </Link>
      </motion.div>
    ));
  } else {
    session = (
      <div className="flex text-center my-4 mx-3 p-2">No sessions found</div>
    );
  }
  return session;
}
