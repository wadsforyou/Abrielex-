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

// A non-2xx response makes the SDK throw a generic axios error, so the real
// backend message ({"error": "..."}) is lost and the UI shows a bare
// "status code 500". Recover the server's message and status so every section
// reports what actually went wrong.
function describeError(error) {
  const status = error?.response?.status || error?.status;
  const data = error?.response?.data ?? error?.data;
  let message = "";
  if (typeof data === "string" && data.trim()) {
    message = data;
  } else if (data && typeof data === "object") {
    message = data.error || data.message || "";
  }
  if (!message) message = error?.message || "Request failed";
  const described = new Error(status ? message + " (HTTP " + status + ")" : message);
  described.status = status;
  return described;
}

async function invokeAdmin(payload) {
  try {
    const response = await base44.functions.invoke("adminControl", payload);
    const body = response?.data ?? response;
    if (body && typeof body === "object" && body.error) {
      throw new Error(body.error);
    }
    return response;
  } catch (error) {
    // Already a readable backend message (thrown just above) — keep it.
    if (error?.response === undefined && error?.status === undefined) throw error;
    throw describeError(error);
  }
}

export async function adminList(entity, sort = "-created_date", limit = 500) {
  const response = await invokeAdmin({ action: "entity_read", entity, operation: "list", sort, limit });
  return unwrapList(response);
}

export async function adminFilter(entity, filters = {}, sort = "-created_date", limit = 500) {
  const response = await invokeAdmin({ action: "entity_read", entity, operation: "filter", filters, sort, limit });
  return unwrapList(response);
}
