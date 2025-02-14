import { Box, IconButton, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { DeleteIcon } from '../../../components/icons'
import { FlexContainer } from '../../../components/utilities/FlexContainer'
import { Draft } from '../types/Draft'

type DraftListItemProps = {
  draft: Draft
  onDelete: (id: number) => void
}

export const DraftListItem = ({ draft, onDelete }: DraftListItemProps) => {
  const truncatedContent =
    draft.content.length > 50
      ? `${draft.content.slice(0, 50)}...`
      : draft.content

  const handleDeleteDraft = (e: React.MouseEvent) => {
    e.preventDefault()
    onDelete(draft.id)
  }

  return (
    <Link to={`/drafts/${draft.id}`}>
      <Box
        sx={{
          borderBottom: '1px solid #ddd',
          padding: '16px',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <FlexContainer justifyContent="space-between" alignItems="center">
          <Typography
            variant="h6"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {draft.title}
          </Typography>
          <IconButton onClick={handleDeleteDraft}>
            <DeleteIcon />
          </IconButton>
        </FlexContainer>

        <Typography variant="body2" color="text.secondary">
          {truncatedContent}
        </Typography>

        <FlexContainer
          gap="8px"
          justifyContent="flex-end"
          sx={{ marginTop: '24px' }}
        >
          <Typography variant="caption" color="text.secondary">
            作成日: {new Date(draft.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {draft.relativeUpdatedAt}に更新
          </Typography>
        </FlexContainer>
      </Box>
    </Link>
  )
}
