"use client";

import { useState } from "react";
import { POST } from "../api/route";
import { useRouter } from "next/navigation";

export default function CreateServerArea() {
  const router = useRouter();

  let [deckQuantity, setDeckQuantity] = useState<number>(6);
  let [serverName, setServerName] = useState(" ");
  let [serverNameError, setServerNameError] = useState(false);

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
    <div>
      <div className="my-2">
        <p className="text-2xl">Server Name:</p>
        <input
          className={`border-2 rounded-3xl px-3 ${
            serverNameError ? "border-red-500" : ""
          }`}
          onChange={(e) => setServerName(e.target.value)}
        ></input>
      </div>
      <div className="m-4">
        <p className="text-2xl">Quantity of decks:</p>
        <div className="flex justify-center">
          <button
            className="text-center rounded-3xl border-2 w-8 bg-black"
            onClick={() => handleDeckQuantity(-1)}
          >
            -
          </button>
          <input
            className="border-2 rounded-3xl text-center w-80%"
            inputMode="numeric"
            pattern="[0-9].+"
            maxLength={20}
            onKeyUp={(e) => {
              if (Number(e.key) >= 4 && Number(e.key) <= 8) {
                setDeckQuantity(Number(e.key));
              }
            }}
            onChange={(e) => {}}
            value={deckQuantity}
            type="text"
            min="4"
            max="8"
          ></input>
          <button
            className="text-center rounded-3xl border-2 w-8 bg-black"
            onClick={() => handleDeckQuantity(1)}
          >
            +
          </button>
        </div>
      </div>
      <button
        className="rounded-full h-10 w-90% bg-teal-400 text-black hover:bg-teal-50"
        onClick={() => handleCreateServer()}
      >
        Create Server
      </button>
    </div>
  );
}
