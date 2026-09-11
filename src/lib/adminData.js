import { base44 } from "@/api/base44Client";

// The SDK's `functions.invoke` resolves to the HTTP response wrapper
// ({ data, status, headers }), so the function's JSON body is `response.data`.
// Different SDK versions have returned the body directly, so accept both shapes.
function unwrapList(response) {
  const body = response?.data ?? response;
  const result = body?.result;
  if (Array.isArray(result)) return result;
  if (Array.isArray(body)) return body;
  return [];
}

// Surface a backend error (the function returns { error } with a non-2xx
// status) as a thrown Error, so sections show a real error state instead of an
// empty "No records".
function unwrapBody(response) {
  const body = response?.data ?? response;
  if (body && typeof body === "object" && body.error) {
    throw new Error(body.error);
  }
  return body;
}

export async function adminList(entity, sort = "-created_date", limit = 500) {
  const response = await base44.functions.invoke("adminControl", { action: "entity_read", entity, operation: "list", sort, limit });
  unwrapBody(response);
  return unwrapList(response);
}

export async function adminFilter(entity, filters = {}, sort = "-created_date", limit = 500) {
  const response = await base44.functions.invoke("adminControl", { action: "entity_read", entity, operation: "filter", filters, sort, limit });
  unwrapBody(response);
  return unwrapList(response);
}
