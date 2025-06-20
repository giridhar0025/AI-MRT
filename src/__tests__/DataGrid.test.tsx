import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../store'
import DataGrid from '../components/DataGrid'
import { vi } from 'vitest'

vi.mock('material-react-table', () => ({
  MaterialReactTable: ({ data }: { data: any[] }) => (
    <table>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} role="row">
            <td>{row.id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}))

describe('DataGrid', () => {
  it('loads data', () => {
    render(
      <Provider store={store}>
        <DataGrid />
      </Provider>,
    )
    expect(screen.getAllByRole('row').length).toBe(2000)
  })
})
import { toggleColumnVisibility } from '../store/tableSlice'

describe('pin column', () => {
  it('can pin column', () => {
    store.dispatch(toggleColumnVisibility({ column: 'name', visible: false }))
    expect(store.getState().table.columnVisibility).toEqual({ name: false })
  })
})
