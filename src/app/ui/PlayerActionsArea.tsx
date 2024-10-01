"use client";

import { useRouter } from "next/navigation";
import { patchPlayerAction } from "../api/route";

export default function PlayerActionArea(props: { id: string }) {
  const router = useRouter();
  async function handlePlayerAction(playerAction: string) {
    await patchPlayerAction(props.id, playerAction);
    router.refresh();
  }

  return (
    <div className="flex w-1/3 h-90% text-center  mx-3 p-2 gap-8">
      <button
        className="w-1/2 p-1 rounded-3xl bg-black hover:bg-white"
        onClick={() => handlePlayerAction("hit")}
      >
        <div className="bg-blue-600 flex items-center justify-center w-100% h-100% rounded-3xl">
          hit
        </div>
      </button>
      <button
        className="w-1/2 p-1 rounded-3xl bg-black hover:bg-white"
        onClick={() => handlePlayerAction("stand")}
      >
        <div className="bg-yellow-600 flex items-center justify-center w-100% h-100% rounded-3xl">
          stand
        </div>
      </button>
    </div>
  );
}
