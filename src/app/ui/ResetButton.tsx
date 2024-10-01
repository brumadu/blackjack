"use client";

import { useRouter } from "next/navigation";
import { patchClearHand } from "../api/route";

export default function ResetButton(props: { id: string }) {
  const router = useRouter();
  async function handleResetGame() {
    await patchClearHand(props.id);
    router.refresh();
  }

  return (
    <div className="flex w-1/3 h-90% text-center my-4 mx-3 p-2 gap-8 justify-center">
      <button
        className="flex items-center justify-center border-2 w-1/2 rounded-3xl bg-blue-300 hover:bg-blue-400"
        onClick={() => handleResetGame()}
      >
        reset game
      </button>
    </div>
  );
}
