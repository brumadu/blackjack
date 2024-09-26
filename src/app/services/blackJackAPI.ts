let api = process.env.API_HOST;

export async function getSession() {
  const response = await fetch(api + "/sessions", {
    method: "GET",
    cache: "no-store",
  });
  return response.json();
}

export async function createNewServer(title: string, deckQuantity: number) {
  const response = await fetch(api + "/sessions", {
    method: "POST",
  });
  return response.json();
}
