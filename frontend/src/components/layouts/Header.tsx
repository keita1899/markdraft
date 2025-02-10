import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export const Header = () => {
  const { currentUser } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
        >
          Markdraft
        </Typography>

        {isMobile && (
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerToggle}
            aria-label="メニューを開く"
          >
            <MenuIcon />
          </IconButton>
        )}

        {!isMobile && (
          <Box sx={{ display: 'flex' }}>
            {currentUser.isSignedIn ? (
              <>
                <Typography sx={{ cursor: 'pointer', color: 'inherit' }}>
                  ログアウト
                </Typography>
              </>
            ) : (
              <>
                <Typography
                  component={Link}
                  to="/signup"
                  sx={{ color: 'inherit', marginRight: 2 }}
                >
                  新規登録
                </Typography>
                <Typography
                  component={Link}
                  to="/signin"
                  sx={{ color: 'inherit' }}
                >
                  ログイン
                </Typography>
              </>
            )}
          </Box>
        )}
      </Toolbar>

      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250 }} role="navigation" aria-label="メインメニュー">
          <List>
            {currentUser.isSignedIn ? (
              <>
                <ListItem>
                  <ListItemText primary="ログアウト" />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem component={Link} to="/signup">
                  <ListItemText primary="新規登録" />
                </ListItem>
                <ListItem component={Link} to="/signin">
                  <ListItemText primary="ログイン" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  )
}
