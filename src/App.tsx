import DataGrid from './components/DataGrid/DataGrid'
import ChatPanel from './components/ChatPanel/ChatPanel'
import { Provider } from 'react-redux'
import { store } from './state'
import { CssBaseline } from '@mui/material'

export default function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <div className="p-4">
        <DataGrid />
        <ChatPanel />
      </div>
    </Provider>
  )
}
