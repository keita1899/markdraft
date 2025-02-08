import { Box, BoxProps } from '@mui/material'

type TextAlignContainerProps = {
  align?: 'left' | 'center' | 'right' | 'justify'
} & BoxProps

export const TextAlignContainer = ({
  align = 'left',
  ...props
}: TextAlignContainerProps) => <Box {...props} sx={{ textAlign: align }} />
