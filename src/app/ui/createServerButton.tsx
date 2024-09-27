"use client";

import { useState } from "react";

export default function CreateServerButton() {
  let [state, setState] = useState(false);

  function handleClick() {
    setState(!state);
    console.log(state);
  }
  return (
    <button
      className="rounded-full h-10 w-90% bg-teal-400 text-black hover:bg-teal-50"
      onClick={() => handleClick()}
    >
      Server Button
    </button>
  );
}
