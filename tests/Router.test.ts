import { toolCallSchema } from '../src/app/zodSchemas'

describe('router schema', () => {
  it('valid call passes', () => {
    const res = toolCallSchema.safeParse({ action:'setPage', page:1 })
    expect(res.success).toBe(true)
  })
  it('invalid call fails', () => {
    const res = toolCallSchema.safeParse({ action:'setPage' })
    expect(res.success).toBe(false)
  })
})
