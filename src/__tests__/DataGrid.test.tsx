import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../state'
import DataGrid from '../components/DataGrid/DataGrid'
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
