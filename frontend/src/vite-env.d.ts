/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_AUTH0_MODERATOR_ROLE: string;
  readonly VITE_JOUTONBAD_CLIENT: string;
  readonly VITE_AUTH0_CLIENT_DOMAIN: string;
  readonly VITE_AUTH0_CLIENT_ID: string;
  readonly VITE_AUTH0_AUDIENCE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
