import { createContext, useContext } from 'react'

type SnackbarContextType = {
  openSnackbar: (message: string, severity: 'success' | 'error') => void
  closeSnackbar: () => void
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
)

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext)
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider')
  }
  return context
}
