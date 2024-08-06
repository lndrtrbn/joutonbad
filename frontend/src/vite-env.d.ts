/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KC_EDITOR_ROLE: string;
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
