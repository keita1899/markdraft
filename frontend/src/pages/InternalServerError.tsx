import { Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { TextAlignContainer } from '../components/utilities/TextAlignContainer'

const InternalServerError = () => (
  <TextAlignContainer align="center" mt={8}>
    <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
      500
    </Typography>
    <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
      Internal Server Error
    </Typography>
    <Typography variant="h5" sx={{ mt: 2 }}>
      サーバーに問題が発生しました。後ほどもう一度お試しください。
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

export default InternalServerError
