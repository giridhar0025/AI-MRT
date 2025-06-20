/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ALLOW_FORMULAS?: string
  readonly VITE_ALLOW_DYNAMIC_RENDERERS?: string
  readonly VITE_MAX_COMPUTED_COLUMNS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
