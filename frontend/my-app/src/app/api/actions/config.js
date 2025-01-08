import { getToken } from "@/lib/token";

const baseUrl = "http://generationsbank_db:8080";

async function getHeaders(useContentHeader = true) {
  const token = await getToken();
  const headers = new Headers();
  if (useContentHeader) headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  return headers;
}

export { getHeaders, baseUrl };
