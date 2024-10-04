"use client";

import { useRouter } from "next/navigation";
import { patchPlayerAction } from "../api/sessionAPI";

export default function PlayerActionArea(props: {
  id: string;
  gameResult: any;
}) {
  const router = useRouter();

  async function handlePlayerAction(id: string, playerAction: string) {
    await patchPlayerAction(id, playerAction);
    setTimeout(() => router.refresh(), 100);
  }

  return (
    <div className="flex w-1/2 h-100% aspect-auto text-center gap-8">
      <button
        className="border-2 rounded-lg text-center text-black border-black w-1/2 shadow-lg shadow-black hover:border-white"
        onClick={() => handlePlayerAction(props.id, "hit")}
      >
        <div className="bg-blue-600 flex items-center justify-center w-100% h-100% rounded-lg">
          hit
        </div>
      </button>
      <button
        className="border-2 rounded-lg text-center text-black border-black w-1/2 shadow-lg shadow-black hover:border-white"
        onClick={() => handlePlayerAction(props.id, "stand")}
      >
        <div className="bg-red-500 flex items-center justify-center w-100% h-100% rounded-lg">
          stand
        </div>
      </button>
    </div>
  );
}
