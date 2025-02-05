import { Box, BoxProps } from '@mui/material'

type TextAlignContainerProps = {
  align?: 'left' | 'center' | 'right' | 'justify'
} & BoxProps

const TextAlignContainer = ({
  align = 'left',
  ...props
}: TextAlignContainerProps) => <Box {...props} sx={{ textAlign: align }} />

export default TextAlignContainer
