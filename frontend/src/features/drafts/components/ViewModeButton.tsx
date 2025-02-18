import { Button } from '@mui/material'
import { ViewMode } from '../types/ViewMode'

type ViewModeButtonProps = {
  mode: ViewMode
  viewMode: ViewMode
  setViewMode: (viewMode: ViewMode) => void
  icon: React.ReactNode
}

export const ViewModeButton = ({
  mode,
  viewMode,
  setViewMode,
  icon,
}: ViewModeButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={() => setViewMode(mode)}
      sx={getButtonStyles(mode === viewMode)}
    >
      {icon}
    </Button>
  )
}

const getButtonStyles = (isActive: boolean) => ({
  ml: 1,
  backgroundColor: isActive ? 'primary.main' : 'grey.300',
  color: isActive ? '#fff' : 'text.primary',
  '&:hover': {
    backgroundColor: isActive ? 'primary.dark' : 'grey.400',
  },
})
