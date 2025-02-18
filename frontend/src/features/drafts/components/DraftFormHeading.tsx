import { Box, Typography } from '@mui/material'
import {
  EditIcon,
  SplitscreenIcon,
  VisibilityIcon,
} from '../../../components/icons'
import { FlexContainer } from '../../../components/utilities/FlexContainer'
import { ViewMode } from '../types/ViewMode'
import { ViewModeButton } from './ViewModeButton'

type DraftFormHeadingProps = {
  createdAt?: string | null
  updatedAt?: string | null
  viewMode: ViewMode
  setViewMode: (viewMode: ViewMode) => void
}

export const DraftFormHeading = ({
  createdAt,
  updatedAt,
  viewMode,
  setViewMode,
}: DraftFormHeadingProps) => {
  return (
    <FlexContainer
      justifyContent="space-between"
      sx={{
        my: 2,
        flexDirection: { xs: 'column', sm: 'row' },
      }}
    >
      <Box>
        <Box sx={{ mr: 2 }}>
          {createdAt && (
            <Typography variant="body2" color="textSecondary">
              作成日: {createdAt}
            </Typography>
          )}
          {updatedAt && (
            <Typography variant="body2" color="textSecondary">
              更新日: {updatedAt}
            </Typography>
          )}
        </Box>
      </Box>

      <FlexContainer
        alignItems="center"
        justifyContent="center"
        sx={{
          my: { xs: 2, sm: 0 },
        }}
      >
        <ViewModeButton
          mode="editor"
          viewMode={viewMode}
          setViewMode={setViewMode}
          icon={<EditIcon />}
        />
        <ViewModeButton
          mode="preview"
          viewMode={viewMode}
          setViewMode={setViewMode}
          icon={<VisibilityIcon />}
        />
        <ViewModeButton
          mode="both"
          viewMode={viewMode}
          setViewMode={setViewMode}
          icon={<SplitscreenIcon sx={{ transform: 'rotate(90deg)' }} />}
        />
      </FlexContainer>
    </FlexContainer>
  )
}
