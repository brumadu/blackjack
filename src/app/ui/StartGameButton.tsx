"use client";

import { useRouter } from "next/navigation";
import { getStartRound } from "../api/sessionAPI";

export default function startGameButton(props: { sessionId: string }) {
  const router = useRouter();

  async function handleClick() {
    console.log("here " + props.sessionId);
    await getStartRound(props.sessionId);
    router.refresh();
  }

  return (
    <div
      className="flex border-2 rounded-3xl w-32 text-center my-4 mx-3 p-2 bg-yellow-300 hover:bg-yellow-200 items-center justify-center"
      onClick={() => handleClick()}
    >
      <div> Start Game </div>
    </div>
  );
}
