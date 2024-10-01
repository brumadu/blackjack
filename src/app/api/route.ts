const api = process.env.API_HOST;

export async function POST(title: string, deckQuantity: number) {
  await fetch(api + "/sessions", {
    body: JSON.stringify({ title: title, deckQuantity: deckQuantity }),
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
}

export async function patchPlayerAction(id: string, playerAction: string) {
  await fetch(api + "/sessions/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ playerAction: playerAction }),
  });
}

export async function patchClearHand(id: string) {
  await fetch(api + "/sessions/" + id + "/clearHand", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  });
}
