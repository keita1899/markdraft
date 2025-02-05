import { Box, Typography } from '@mui/material'

export const Footer = () => (
  <Box
    component="footer"
    sx={{ mt: 4, py: 2, bgcolor: '#e0e0e0', textAlign: 'center' }}
  >
    <Typography variant="body2" color="textSecondary">
      © 2025 Markdraft All rights reserved.
    </Typography>
  </Box>
)
