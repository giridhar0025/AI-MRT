import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../store'
import ChatPanel from '../components/ChatPanel'
import { vi } from 'vitest'

vi.mock('../llm/chat', () => ({
  getToolCall: vi.fn().mockResolvedValue({
    action: 'applyFilter',
    column: 'status',
    operator: 'equals',
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
