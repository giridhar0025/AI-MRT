import { buildColumns } from '../src/lib/columnsFactory'

describe('computed column', () => {
  it('evaluates formula', () => {
    const cols = [{ id: 'total', header: 'Total', formula: 'row.a + row.b' }]
    const data = { a: 2, b: 3 }
    const col = buildColumns(cols)[0]
    expect(col.accessorFn!(data)).toBe(5)
  })
})
