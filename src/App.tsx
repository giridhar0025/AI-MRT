import DataGrid from './components/DataGrid'
import ChatPanel from './components/ChatPanel'
import { Provider } from 'react-redux'
import { store } from './store'
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
