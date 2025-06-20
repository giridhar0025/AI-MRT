import { render } from '@testing-library/react'
import { buildColumns } from '../src/lib/columnsFactory'
import { registerRenderer } from '../src/lib/cellRenderRegistry'
import { env } from '../src/env'
import React from 'react'

describe('renderer registry', () => {
  it('renders custom cell', () => {
    env.ALLOW_DYNAMIC_RENDERERS = true as any
    registerRenderer('id', (v) => <span data-testid="custom">{v}X</span>)
    const col = buildColumns([{ id: 'id', header: 'ID' }])[0]
    const { getByTestId } = render(<>{col.Cell!({ cell: { getValue: () => 5 } } as any)}</>)
    expect(getByTestId('custom').textContent).toBe('5X')
  })
})
