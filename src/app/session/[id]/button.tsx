"use client";
import { patchPlayerAction } from "@/app/services/sessionAPI";

export default function ActionButton(props: {
  id: string;
  action: string;
  color: string;
}) {
  return (
    <button
      className={`border-2 rounded-3xl bg-${props.color}-400 w-32 h-24 text-center mb-6 hover:bg-slate-600`}
      onClick={async () => await patchPlayerAction(props.id, props.action)}
    >
      {props.action}
    </button>
  );
}
