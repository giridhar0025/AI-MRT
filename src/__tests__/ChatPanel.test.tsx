import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../state'
import ChatPanel from '../components/ChatPanel/ChatPanel'
import { vi } from 'vitest'

vi.mock('../llm/chat', () => ({
  getToolCall: vi.fn().mockResolvedValue({
    action: 'applyFilter',
    columnId: 'status',
    operator: '=',
    value: 'active',
  }),
}))

describe('ChatPanel', () => {
  it('dispatches filter action', async () => {
    const user = userEvent.setup()
    render(
      <Provider store={store}>
        <ChatPanel />
      </Provider>,
    )
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true })
    const input = screen.getByPlaceholderText(/ask something/i)
    await user.type(input, 'filter status active')
    await user.click(screen.getByLabelText(/send/i))
    expect(store.getState().table.columnFilters[0]).toEqual({ id: 'status', value: 'active' })
  })
})
