import { store } from '../src/state'
import { routeToolCall } from '../src/lib/intentRouter'

describe('dynamic columns', () => {
  it('adds column', () => {
    routeToolCall({ action: 'addColumn', column: { id: 'foo', header: 'Foo' } }, store.dispatch)
    expect(store.getState().table.columns.find(c => c.id === 'foo')).toBeTruthy()
  })
})
