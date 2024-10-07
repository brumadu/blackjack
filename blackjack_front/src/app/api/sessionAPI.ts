import { add, getAll } from "../lib/redis";

const api = process.env.API_HOST;

export async function getSessionList() {
  const cachedData = await getAll();
  if (cachedData && cachedData.length !== 0) {
    return cachedData;
  } else {
    const sessions = await fetch(api + "/sessions", {
      method: "GET",
      cache: "no-cache",
    }).then((e) => e.json());
    sessions.forEach((session: any) => {
      const redisSession = {
        status: session.status,
        deckQuantity: session.deckQuantity,
        title: session.title,
      };
      add(session.id, redisSession);
    });
    return sessions;
  }
}

export async function postSession(title: string, deckQuantity: number) {
  const response = await fetch(api + "/sessions", {
    body: JSON.stringify({ title: title, deckQuantity: deckQuantity }),
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  }).then((e) => e.json());
  const redisSession = {
    status: response.status,
    deckQuantity: response.deckQuantity,
    title: response.title,
  };
  await add(response.id, redisSession);
  return response;
}

export async function getSessionById(id: string) {
  const response = await fetch(api + `/sessions/${id}`, {
    method: "GET",
    cache: "no-store",
  });
  const resp = await response.json();
  return resp;
}

export async function getStartRound(id: string) {
  const response = await fetch(api + "/sessions/" + id + "/card", {
    method: "GET",
    cache: "no-store",
  });
  return response.json();
}

export async function patchPlayerAction(id: string, playerAction: string) {
  await fetch(`${api}/sessions/${id}`, {
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
