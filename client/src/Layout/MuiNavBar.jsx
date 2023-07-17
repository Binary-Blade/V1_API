import React, { useState, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Button,
  Box,
  Tooltip,
  MenuItem,
  Container,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../context/authContext';
import theme from '../ui/theme';
import Cookies from 'js-cookie';

const pages = ['Homepage', 'Farmers', 'Products', 'Contact'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { authToken, removeAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = (event) => {
    if (event.currentTarget.textContent === 'Logout') {
      removeAuthToken();
      navigate('/login'); // This will bring you back to the homepage after logout
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: theme.palette.background.secondary }}
    >
      <Container maxWidth="xll">
        <Toolbar disableGutters>
          <Avatar
            src="../../Logo.png"
            alt="Logo"
            sx={{
              width: { xs: '40px', md: '80px' },
              height: { xs: '40px', md: '80px' },
              display: { xs: 'none', md: 'flex' },
              mr: 1,
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              fontSize: '32px',
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: theme.palette.title.primary,
              textDecoration: 'none',
            }}
          >
            AgriFlow
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color={theme.palette.title.primary}
            >
              <MenuIcon
                sx={{ fontSize: 35, color: theme.palette.title.primary }}
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      style={{
                        textDecoration: 'none',
                        color: theme.palette.title.primary,
                        fontSize: '15px',
                      }}
                      to={`/${page}`}
                    >
                      {page}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Avatar
            src="../../Logo.png"
            alt="Logo"
            sx={{
              width: { xs: '40px', md: '80px' },
              height: { xs: '40px', md: '80px' },
              display: { xs: 'flex', md: 'none' },
              mr: 1,
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            href=""
            sx={{
              mr: 2,
              fontSize: '32px',
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: theme.palette.title.primary,
              textDecoration: 'none',
            }}
          >
            AGRIFLOW
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: theme.palette.title.primary,
                  display: 'block',
                  fontSize: '20px', // Change the font size here
                  width: '150px', // Change the width here
                  height: '50px', // Change the height here
                }}
              >
                <Link
                  style={{
                    textDecoration: 'none',
                    color: theme.palette.title.primary,
                  }}
                  to={`/${page}`}
                >
                  {page}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                aria-label="menu"
                sx={{ p: 0 }}
              >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    sx={{
                      color: theme.palette.title.primary,
                      fontSize: '15px',
                    }}
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
