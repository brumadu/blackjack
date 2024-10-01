"use client";

import { useState } from "react";
import { POST } from "../api/route";
import { useRouter } from "next/navigation";

export default function CreateServerArea() {
  const router = useRouter();

  const [deckQuantity, setDeckQuantity] = useState<number>(6);
  const [serverName, setServerName] = useState(" ");
  const [serverNameError, setServerNameError] = useState(false);

  function handleDeckQuantity(value: number) {
    if (deckQuantity + value > 8 || deckQuantity + value < 4) {
      setDeckQuantity(deckQuantity);
    } else {
      setDeckQuantity(deckQuantity + value);
    }
  }

  async function handleCreateServer() {
    if (!serverName || serverName == " " || serverName.length > 20) {
      setServerNameError(true);
    } else {
      setServerNameError(false);
      await POST(serverName, deckQuantity);
      router.refresh();
    }
  }
  return (
    <div className="flex flex-col justify-center h-85%">
      <div className="my-2 w-full">
        <p className="text-2xl">Session Name:</p>
        <input
          className={`border-2 rounded-2xl text-center border-slate-700 w-1/2 shadow-sm shadow-slate-700 hover:border-white ${
            serverNameError ? "border-red-500" : ""
          }`}
          onChange={(e) => setServerName(e.target.value)}
        ></input>
      </div>
      <div className="my-4 mb-8 w-full">
        <p className="text-2xl">Quantity of decks:</p>
        <div className="flex justify-center w-full text-black gap-6 ">
          <button
            className="text-center rounded-2xl border-2 border-slate-800 w-8 bg-slate-700 text-white shadow-md shadow-slate-700/70 hover:border-white"
            onClick={() => handleDeckQuantity(-1)}
          >
            -
          </button>
          <input
            className="border-2 rounded-2xl text-center border-slate-700 w-1/2 shadow-sm shadow-slate-700 hover:border-white "
            inputMode="numeric"
            pattern="[0-9].+"
            maxLength={20}
            onKeyUp={(e) => {
              if (Number(e.key) >= 4 && Number(e.key) <= 8) {
                setDeckQuantity(Number(e.key));
              }
            }}
            onChange={(e) => {
              e;
            }}
            value={deckQuantity}
            type="text"
            min="4"
            max="8"
          ></input>
          <button
            className="text-center rounded-2xl border-2 border-slate-800 w-8 bg-slate-700 text-white shadow-md shadow-slate-700/70 hover:border-white"
            onClick={() => handleDeckQuantity(1)}
          >
            +
          </button>
        </div>
      </div>
      <div className="rounded-2xl w-90% self-center bg-slate-800  p-1 hover:bg-white shadow-md shadow-slate-700/70 ">
        <button
          className="rounded-2xl w-full h-10 bg-slate-700 text-white"
          onClick={() => handleCreateServer()}
        >
          Create Session
        </button>
      </div>
    </div>
  );
}
