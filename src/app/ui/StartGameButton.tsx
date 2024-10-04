"use client";

import { useRouter } from "next/navigation";
import { getStartRound } from "../api/sessionAPI";

export default function StartGameButton(props: { sessionId: string }) {
  const router = useRouter();

  async function handleClick() {
    await getStartRound(props.sessionId);
    setTimeout(() => router.refresh(), 100);
  }

  return (
    <button
      className=" border-2 rounded-lg text-center text-black border-black w-1/2 shadow-lg shadow-black hover:border-white"
      onClick={() => handleClick()}
    >
      <div className="flex text-black text-center w-100% h-100% rounded-lg bg-yellow-400 items-center justify-center">
        Start Game
      </div>
    </button>
  );
}
