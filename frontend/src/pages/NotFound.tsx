import { Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { TextAlignContainer } from '../components/utilities/TextAlignContainer'

const NotFound = () => (
  <TextAlignContainer align="center" mt={8}>
    <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
      404
    </Typography>
    <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
      Not Found
    </Typography>
    <Typography variant="h5" sx={{ mt: 2 }}>
      ページが見つかりません
    </Typography>
    <Button
      variant="contained"
      color="primary"
      component={Link}
      to="/"
      sx={{ mt: 2 }}
    >
      ホームへ戻る
    </Button>
  </TextAlignContainer>
)

export default NotFound
