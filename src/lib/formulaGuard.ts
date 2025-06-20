const banned = ['import', 'require', 'process', 'eval', 'window']

export function isFormulaSafe(formula: string) {
  if (formula.length > 120) return false
  const lower = formula.toLowerCase()
  return !banned.some((b) => lower.includes(b))
}
