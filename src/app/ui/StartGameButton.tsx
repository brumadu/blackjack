"use client";

import { useRouter } from "next/navigation";
import { getStartRound } from "../api/sessionAPI";

export default function startGameButton(props: { sessionId: string }) {
  const router = useRouter();

  async function handleClick() {
    await getStartRound(props.sessionId);
    router.refresh();
  }

  return (
    <button
      className=" bg-yellow-500 rounded-2xl w-2/5 h-2/5 my-4 p-1 hover:bg-black"
      onClick={() => handleClick()}
    >
      <div className="flex text-black text-center w-100% h-100% rounded-3xl bg-yellow-400 items-center justify-center">
        Start Game
      </div>
    </button>
  );
}
