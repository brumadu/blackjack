let api = process.env.API_HOST;

export async function getSessionList() {
  const response = await fetch(api + "/sessions", {
    method: "GET",
    cache: "no-cache",
  });
  return response.json();
}

export async function createNewServer(title: string, deckQuantity: number) {
  let api = process.env.API_HOST;
  console.log(api);
  const response = await fetch(api + "/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: title, deckQuantity: deckQuantity }),
  });
  return response.json();
}

export async function getSessionById(id: string) {
  const response = await fetch(api + `/sessions/${id}`, {
    method: "GET",
    cache: "no-store",
  });
  const resp = await response.json();
  return resp;
}

export async function patchPlayerAction(id: string, playerAction: string) {
  let api = process.env.API_HOST;
  const response = await fetch(api + " ", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ playerAction: playerAction }),
  });
  console.log("here " + id + playerAction);
  return response.json();
}

export async function getStartRound(id: string) {
  const response = await fetch(api + "/sessions/" + id + "/card", {
    method: "GET",
    cache: "no-store",
  });
  return response.json();
}
