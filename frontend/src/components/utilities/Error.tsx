import { Card, CardContent, Container } from '@mui/material'

type ErrorProps = {
  message?: string
}

const DEFAULT_ERROR_MESSAGE =
  '現在、システムに技術的な問題が発生しています。ご不便をおかけして申し訳ありませんが、復旧までしばらくお待ちください。'

export const Error = ({ message = DEFAULT_ERROR_MESSAGE }: ErrorProps) => {
  return (
    <Container>
      <Card sx={{ p: 3, mt: 8, backgroundColor: '#EEEEEE' }}>
        <CardContent sx={{ lineHeight: 2 }}>{message}</CardContent>
      </Card>
    </Container>
  )
}
