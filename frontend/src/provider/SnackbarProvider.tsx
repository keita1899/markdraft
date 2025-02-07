import { Snackbar, Alert } from '@mui/material'
import { useState } from 'react'
import { SnackbarContext } from '../context/SnackbarContext'

type SnackbarProviderProps = {
  children: React.ReactNode
}

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState<'success' | 'error'>('success')

  const openSnackbar = (msg: string, sev: 'success' | 'error') => {
    setMessage(msg)
    setSeverity(sev)
    setOpen(true)
  }

  const closeSnackbar = () => {
    setOpen(false)
  }

  return (
    <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}
