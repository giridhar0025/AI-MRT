export const env = {
  ALLOW_FORMULAS: import.meta.env.VITE_ALLOW_FORMULAS === 'true',
  ALLOW_DYNAMIC_RENDERERS: import.meta.env.VITE_ALLOW_DYNAMIC_RENDERERS === 'true',
  MAX_COMPUTED_COLUMNS: Number(import.meta.env.VITE_MAX_COMPUTED_COLUMNS) || 5,
}
