"use client";

import { useRouter } from "next/navigation";
import { patchClearHand } from "../api/sessionAPI";

export default function ResetButton(props: { id: string }) {
  const router = useRouter();
  async function handleResetGame() {
    await patchClearHand(props.id);
    setTimeout(() => router.refresh(), 100);
  }

  return (
    <button
      className=" bg-blue-400 rounded-2xl w-2/5 h-2/5 my-4 p-1 hover:bg-black"
      onClick={() => handleResetGame()}
    >
      <div className="flex text-black text-center w-100% h-100% rounded-3xl bg-blue-500 items-center justify-center">
        reset game
      </div>
    </button>
  );
}
