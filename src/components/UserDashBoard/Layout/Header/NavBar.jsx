import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button, Container, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state

const pages = [
  { name: 'Home', link: '/' },
  { name: 'Products', link: '/products' },
  { name: 'About', link: '/about' },
  { name: 'Contact', link: '/contact' },
];

const adminPanelLink = { name: 'Admin Panel', link: '/admin' };
const sellerPanelLink = { name: 'Seller Panel', link: '/seller' };

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const userRole = useSelector(state => state.auth.user?.role); // Access user's role from Redux state

  // Rest of the component code remains unchanged
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMenuItemClick = () => {
    handleCloseNavMenu(); // Close the menu after clicking on a menu item
  };

  return (
    <div>
      <AppBar position="relative">
        <Container maxWidth="xl" style={{ backgroundColor: '#042a04' }}>
          <Toolbar disableGutters>
            {isMobile && (
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            )}

            {isMobile && anchorElNav && (
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                PaperProps={{
                  style: {
                    marginTop: '50px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    alignItems: 'center',
                  },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleMenuItemClick}>
                    <Link to={page.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Typography variant="body1" color="textPrimary">
                        {page.name}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
                {userRole === 'admin' && (
                  <MenuItem onClick={handleMenuItemClick}>
                    <Link to={adminPanelLink.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Typography variant="body1" color="textPrimary">
                        {adminPanelLink.name}
                      </Typography>
                    </Link>
                  </MenuItem>
                )}
                {userRole === 'seller' && (
                  <MenuItem onClick={handleMenuItemClick}>
                    <Link to={sellerPanelLink.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Typography variant="body1" color="textPrimary">
                        {sellerPanelLink.name}
                      </Typography>
                    </Link>
                  </MenuItem>
                )}
              </Menu>
            )}

            {!isMobile && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                {pages.map((page) => (
                  <Button key={page.name} sx={{ color: 'inherit', mx: 5 }}>
                    <Link to={page.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {page.name}
                    </Link>
                  </Button>
                ))}
                {userRole === 'admin' && (
                  <Button key={adminPanelLink.name} sx={{ color: 'inherit', mx: 5 }}>
                    <Link to={adminPanelLink.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {adminPanelLink.name}
                    </Link>
                  </Button>
                )}
                {userRole === 'seller' && (
                  <Button key={sellerPanelLink.name} sx={{ color: 'inherit', mx: 5 }}>
                    <Link to={sellerPanelLink.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {sellerPanelLink.name}
                    </Link>
                  </Button>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default NavBar;
