/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CHATBOT_FLOW_ID: string;
  readonly VITE_CHATBOT_HOST_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
