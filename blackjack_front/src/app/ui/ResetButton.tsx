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
      className=" border-2 rounded-lg text-center text-black border-black w-1/2 shadow-lg shadow-black hover:border-white"
      onClick={() => handleResetGame()}
    >
      <div className="flex text-black text-center w-100% h-100% rounded-lg bg-blue-500 items-center justify-center">
        reset game
      </div>
    </button>
  );
}
