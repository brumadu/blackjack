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
    <div className="flex w-1/3 h-90% text-center  mx-3 p-2 gap-8">
      <button
        className="w-1/2 p-1 rounded-3xl bg-black hover:bg-white"
        onClick={() => handlePlayerAction(props.id, "hit")}
      >
        <div className="bg-blue-600 flex items-center justify-center w-100% h-100% rounded-3xl">
          hit
        </div>
      </button>
      <button
        className="w-1/2 p-1 rounded-3xl bg-black hover:bg-white"
        onClick={() => handlePlayerAction(props.id, "stand")}
      >
        <div className="bg-yellow-600 flex items-center justify-center w-100% h-100% rounded-3xl">
          stand
        </div>
      </button>
    </div>
  );
}
