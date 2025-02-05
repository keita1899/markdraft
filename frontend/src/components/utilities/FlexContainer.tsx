import { Box, BoxProps } from '@mui/material'

interface FlexContainerProps extends BoxProps {
  direction?: 'row' | 'column'
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  gap?: number | string
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
}

export const FlexContainer = ({
  direction = 'row',
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  gap = 0,
  wrap = 'nowrap',
  children,
  ...rest
}: FlexContainerProps) => {
  return (
    <Box
      display="flex"
      flexDirection={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
      gap={gap}
      flexWrap={wrap}
      {...rest}
    >
      {children}
    </Box>
  )
}
