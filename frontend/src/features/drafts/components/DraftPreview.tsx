import { Box } from '@mui/material'
import { marked } from 'marked'

type DraftPreviewProps = {
  content: string
}

export const DraftPreview = ({ content }: DraftPreviewProps) => {
  const markdownToHtml = marked(content || 'プレビュー')

  return (
    <Box
      px={2}
      border={1}
      borderColor="grey.300"
      borderRadius={1}
      sx={{
        height: '100%',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        lineHeight: 1,
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: markdownToHtml }} />
    </Box>
  )
}
