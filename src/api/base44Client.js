import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

// During `base44 dev`, the Base44 Vite plugin sets VITE_BASE44_APP_BASE_URL to the
// local backend and proxies `/api` there. In that case we use a same-origin
// serverUrl (empty string) so the SDK hits `/api` and the proxy forwards it to the
// LOCAL backend — required for offline work. In production the variable is unset,
// so we keep the hosted server URL (unchanged behaviour).
const isLocalDev = Boolean(appBaseUrl);

// `base44 dev` only proxies /api to the local backend, but the SDK defaults the
// same-origin case to the page origin, which is what the proxy expects; so an
// empty serverUrl is the correct local value. The SDK's own code documents
// serverUrl as "often relative/empty (same-origin app)".
const serverUrl = isLocalDev ? '' : 'https://base44.app';

export const base44 = createClient({
  appId,
  token,
  functionsVersion,
  serverUrl,
  appBaseUrl
});
