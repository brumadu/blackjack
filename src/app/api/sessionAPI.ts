let api = process.env.API_HOST;

export async function getSessionList() {
  const response = await fetch(api + "/sessions", {
    method: "GET",
    cache: "no-cache",
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

export async function getStartRound(id: string) {
  const response = await fetch(api + "/sessions/" + id + "/card", {
    method: "GET",
    cache: "no-store",
  });
  return response.json();
}
