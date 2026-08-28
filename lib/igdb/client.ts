//default client request (fully customizable)
export async function igdbRequest(endpoint: string, query: string) {
  const response = await fetch(`https://api.igdb.com/v4/${endpoint}`, {
    method: "POST",
    headers: {
      "Client-ID": process.env.IGDB_CLIENT_ID!,
      Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN!}`,
      "Content-Type": "text/plain",
    },
    body: query,
  });

  if (!response.ok) {
    console.error(`IGDB request failed: ${response.json()}`);
    throw new Error(`IGDB request failed: ${response.status}`);
  }

  return response.json();
}
