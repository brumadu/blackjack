let api = process.env.API_HOST;

export async function POST(title: string, deckQuantity: number) {
  let call = api + "/sessions";
  try {
    await fetch(call, {
      body: JSON.stringify({ title: title, deckQuantity: deckQuantity }),
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });
  } catch (e) {
    console.log(e);
  }
}
