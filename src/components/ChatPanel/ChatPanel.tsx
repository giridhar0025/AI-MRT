import { useEffect, useState } from 'react'
import { Drawer, IconButton, TextField, Typography, Box, Stack } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useDispatch } from 'react-redux'
import { getToolCall } from '../../llm/chat'
import { useTableIntentSync } from '../../hooks/useTableIntentSync'
import { routeToolCall } from '../../lib/intentRouter'
import type { AppDispatch } from '../../state'

export default function ChatPanel() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const context = useTableIntentSync()

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
    const tool = await getToolCall(input, context)
    if (tool) routeToolCall(tool, dispatch)
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
