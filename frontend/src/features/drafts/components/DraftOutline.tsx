import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Box, Typography, Drawer, IconButton } from '@mui/material'

type DraftOutlineProps = {
  content: string
  showOutline: boolean
  toggleOutline: () => void
}

export const DraftOutline = ({
  content,
  showOutline,
  toggleOutline,
}: DraftOutlineProps) => {
  const extractOutline = (content: string) => {
    return content
      .split('\n')
      .filter((line) => /^#{1,6} /.test(line))
      .map((line) => {
        const level = (line.match(/^#{1,6}/) || [''])[0].length
        const heading = line.replace(/^#{1,6} /, '')
        return { level, heading }
      })
  }

  const outline = extractOutline(content)

  return (
    <Drawer
      anchor="right"
      open={showOutline}
      onClose={toggleOutline}
      sx={{
        width: 320,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 320,
          backgroundColor: '#FAFAFA',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          p: 2,
          top: {
            xs: '56px',
            sm: '64px',
          },
        },
      }}
    >
      <IconButton
        onClick={toggleOutline}
        sx={{
          position: 'absolute',
          top: 16,
          right: 24,
          zIndex: 1,
          backgroundColor: '#fff',
          borderRadius: '50%',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
      <Box mt={8} borderBottom="1px solid #ddd">
        <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
          構成
        </Typography>
      </Box>
      <Box mt={1}>
        {outline.length > 0 ? (
          outline.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ml: item.level * 2,
                mt: 1.5,
              }}
            >
              <Typography
                variant={item.level === 1 ? 'body1' : 'body2'}
                sx={{
                  fontWeight: item.level === 1 ? 'bold' : 'normal',
                  ml: 1,
                  color: item.level === 1 ? 'text.primary' : 'text.secondary',
                }}
              >
                {item.heading}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            見出しがありません
          </Typography>
        )}
      </Box>
    </Drawer>
  )
}
