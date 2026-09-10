import { base44 } from "@/api/base44Client";
export async function adminList(entity, sort = "-created_date", limit = 500) { const response = await base44.functions.invoke("adminControl", { action: "entity_read", entity, operation: "list", sort, limit }); return response.result || []; }
export async function adminFilter(entity, filters = {}, sort = "-created_date", limit = 500) { const response = await base44.functions.invoke("adminControl", { action: "entity_read", entity, operation: "filter", filters, sort, limit }); return response.result || []; }
