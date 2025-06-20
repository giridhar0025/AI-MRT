import { useEffect, useState } from 'react'
import { Drawer, IconButton, TextField, Typography, Box, Stack } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import {
  setFilters,
  setSorting,
  toggleColumnVisibility,
  setGrouping,
} from '../store/tableSlice'
import { getToolCall } from '../llm/chat'

export default function ChatPanel() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const messages = useSelector((s: RootState) => s.table.columnFilters)
  const dispatch = useDispatch()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleSend = async () => {
    const context = JSON.stringify({
      filters: messages,
    })
    const tool = await getToolCall(input, context)
    if (!tool) return
    switch (tool.action) {
      case 'applyFilter':
        dispatch(
          setFilters([
            {
              id: tool.column,
              value: tool.value,
            },
          ]),
        )
        break
      case 'applySort':
        dispatch(
          setSorting([
            {
              id: tool.column,
              desc: tool.direction === 'desc',
            },
          ]),
        )
        break
      case 'toggleColumnVisibility':
        dispatch(toggleColumnVisibility({ column: tool.column, visible: tool.visible }))
        break
      case 'groupBy':
        dispatch(setGrouping([tool.column]))
        break
      default:
        break
    }
    setInput('')
  }

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <Box className="w-80 p-4 space-y-2">
        <Typography variant="h6">Chat</Typography>
        <Stack direction="row" spacing={1}>
          <TextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            fullWidth
            size="small"
            placeholder="Ask something..."
          />
          <IconButton aria-label="send" onClick={handleSend} color="primary">
            <SendIcon />
          </IconButton>
        </Stack>
      </Box>
    </Drawer>
  )
}
