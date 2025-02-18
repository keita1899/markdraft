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
  Menu,
  MenuItem,
} from '@mui/material'
import { useState, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { useCurrentUserState } from '../../hooks/useCurrentUser'
import { MenuIcon } from '../icons'

export const Header = () => {
  const [currentUser] = useCurrentUserState()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleSettingsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
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
            {currentUser.isFetched && (
              <>
                {!currentUser.isSignedIn && (
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
                {currentUser.isSignedIn && (
                  <>
                    <Typography
                      component={Link}
                      to="/drafts"
                      sx={{ cursor: 'pointer', color: 'inherit' }}
                    >
                      下書き一覧
                    </Typography>
                    <Typography
                      component={Link}
                      to="/signout"
                      sx={{
                        marginLeft: 2,
                        cursor: 'pointer',
                        color: 'inherit',
                      }}
                    >
                      ログアウト
                    </Typography>
                    <Typography
                      sx={{
                        marginLeft: 2,
                        cursor: 'pointer',
                        color: 'inherit',
                      }}
                      onClick={handleSettingsClick}
                    >
                      設定
                    </Typography>

                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                    >
                      <MenuItem component={Link} to="/password/edit">
                        パスワード変更
                      </MenuItem>
                      <MenuItem component={Link} to="/account/delete">
                        アカウント削除
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </>
            )}
          </Box>
        )}
      </Toolbar>

      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250 }} role="navigation" aria-label="メインメニュー">
          <List>
            {currentUser.isFetched && (
              <>
                {currentUser.isSignedIn ? (
                  <>
                    <ListItem component={Link} to="/drafts">
                      <ListItemText primary="下書き一覧" />
                    </ListItem>
                    <ListItem component={Link} to="/signout">
                      <ListItemText primary="ログアウト" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="設定" />
                    </ListItem>
                    <ListItem component={Link} to="/password/edit">
                      <ListItemText primary="パスワード変更" />
                    </ListItem>
                    <ListItem component={Link} to="/account/delete">
                      <ListItemText primary="アカウント削除" />
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
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  )
}
