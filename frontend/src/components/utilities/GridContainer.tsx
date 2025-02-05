import { Box, BoxProps } from '@mui/material'

interface GridContainerProps extends BoxProps {
  columns?: number | string
  rows?: number | string
  gap?: number | string
  areas?: string
  justifyItems?: 'start' | 'end' | 'center' | 'stretch'
  alignItems?: 'start' | 'end' | 'center' | 'stretch'
}

export const GridContainer = ({
  columns = 'repeat(3, 1fr)',
  rows,
  gap = 2,
  areas,
  justifyItems = 'stretch',
  alignItems = 'stretch',
  children,
  ...rest
}: GridContainerProps) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={columns}
      gridTemplateRows={rows}
      gap={gap}
      gridTemplateAreas={areas}
      justifyItems={justifyItems}
      alignItems={alignItems}
      {...rest}
    >
      {children}
    </Box>
  )
}
