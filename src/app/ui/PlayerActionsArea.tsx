"use client";

import { useRouter } from "next/navigation";
import { patchPlayerAction } from "../api/route";

export default function PlayerActionArea(props: { id: string }) {
  let router = useRouter();
  async function handlePlayerAction(playerAction: string) {
    await patchPlayerAction(props.id, playerAction);
    router.refresh();
  }

  return (
    <div className="flex w-1/3 h-90% text-center my-4 mx-3 p-2 gap-8">
      <button
        className="flex items-center justify-center border-2 w-1/2 rounded-3xl bg-green-300"
        onClick={() => handlePlayerAction("hit")}
      >
        hit
      </button>
      <button
        className="flex items-center justify-center border-2 w-1/2 rounded-3xl bg-yellow-300"
        onClick={() => handlePlayerAction("stand")}
      >
        stand
      </button>
    </div>
  );
}
