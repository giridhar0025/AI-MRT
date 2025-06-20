import "@testing-library/jest-dom"
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../src/state'
import DataGrid from '../src/components/DataGrid/DataGrid'
import { addRule, clearRules } from '../src/state/highlightSlice'
import { vi } from 'vitest'

vi.mock('material-react-table', () => ({
  MaterialReactTable: ({ data, muiTableBodyCellProps }: any) => (
    <table>
      <tbody>
        {data.slice(0,1).map((row:any) => (
          <tr key={row.id}>
            <td data-testid="cell" style={muiTableBodyCellProps({ cell: { column: { id:'id'}, getValue: () => row.id } }).style}>{row.id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}))

describe('highlight rules', () => {
  it('apply and clear', () => {
    store.dispatch(addRule({ target:'cell', columnId:'id', condition:{ operator:'=', value:1 }, style:{ backgroundColor:'yellow' } }))
    render(
      <Provider store={store}>
        <DataGrid />
      </Provider>
    )
    expect((screen.getByTestId('cell') as HTMLElement).style.backgroundColor).toBe('yellow')
    store.dispatch(clearRules())
    expect(store.getState().highlight.rules.length).toBe(0)
  })
})
