import { Box, Typography } from '@mui/material'

type FormHeadingProps = {
  title: string
  description: string
}

export const FormHeading = ({ title, description }: FormHeadingProps) => {
  return (
    <Box>
      <Typography variant="h4" textAlign="center">
        {title}
      </Typography>
      <Typography variant="body1" mt={6}>
        {description}
      </Typography>
    </Box>
  )
}
