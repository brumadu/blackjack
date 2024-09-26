import { useEffect, useState } from "react";
import { getSession } from "./services/blackJackAPI";

function sessionList(list: any) {
  let session = list.map((session: any) => (
    <div className="grid grid-cols-3 items-center gap-4 box-border text-center border-2 rounded-full my-4 mx-2 p-2 hover:bg-slate-600">
      <div className="col">{session.title}</div>
      <div className="col">{session.status}</div>
      <div className="col">{session.id}</div>
    </div>
  ));
  return session;
}

export default async function Home() {
  const sessionResponse = await getSession();

  console.log(sessionResponse);
  return (
    <div className="container mx-auto items-center justify-items-center h-dvh font-[family-name:var(--font-geist-mono)]">
      <header className=" flex h-10%"></header>
      <div className="flex h-85% gap-10">
        <div className="basis-3/5 box-border border-2 h-full rounded-3xl">
          <p className="text-2xl w-full text-center mt-2">Server List</p>
          {sessionList(sessionResponse)}
        </div>
        <div className="basis-2/5 box-border border-2 h-full rounded-3xl text-center">
          <p className="text-2xl">Choose an username</p>
          <input className="border-2 border-rose-500 "></input>
          <p className="text-2xl">Create a new Server</p>
          <button className="rounded-full bg-teal-400 text-black">
            Save Changes
          </button>
        </div>
      </div>
      <footer className=" flex h-5%"></footer>
    </div>
  );
}
