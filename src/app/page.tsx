import { useEffect, useState } from "react";

async function getSession() {
  let api = process.env.API_HOST;
  const response = await fetch(api + "/sessions", {
    method: "GET",
  });
  console.log(response);
  return response.json();
}

function sessionList() {
  return <div></div>;
}

export default async function Home() {
  const sessionList = await getSession();
  console.log(sessionList);
  return (
    <div className="container mx-auto items-center justify-items-center h-dvh font-[family-name:var(--font-geist-mono)]">
      <header className=" flex h-10%"></header>
      <div className="flex h-85% gap-10">
        <div className="basis-3/5 box-border border-2 h-full">
          <p className="text-2xl">Server List</p>
          {sessionList.map((session: any) => (
            <div className="grid grid-cols-4 gap-4">
              <div className="col">{session.title}</div>
              <div className="col-span-2 ">{session.id}</div>
              <div className="col">{session.status}</div>
            </div>
          ))}
        </div>
        <div className="basis-2/5 box-border border-2 h-full">
          <p className="text-2xl">Choose an username</p>
          <input className="border-2 border-rose-500 ..."></input>
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
