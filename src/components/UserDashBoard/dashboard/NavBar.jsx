import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button, Container, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const pages = ['Products', 'Pricing', 'Blog'];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <div>
      <AppBar position="relative">
        <Container maxWidth="xl " style={{backgroundColor:'#042a04'}}>
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
    anchorEl={anchorElNav} // Make sure anchorElNav is not null
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
        marginTop: '50px', // Adjust the top margin for better alignment
        backgroundColor: 'blue', // Background color set to blue
        width: '100%', // Set width to 100%
        display: 'flex', // Set display to flex
        justifyContent: 'center', // Center items horizontally
        textAlign: 'center', // Center text horizontally
        alignItems: 'center', // Center items vertically
      },
    }}
  >
    {pages.map((page) => (
      <MenuItem key={page} onClick={handleCloseNavMenu}>
        <Typography variant="body1" color="textPrimary">
          {page}
        </Typography>
      </MenuItem>
    ))}
  </Menu>
)}

            {!isMobile && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                {pages.map((page) => (
                  <Button key={page} sx={{ color: 'inherit', mx: 5 }}>{page}</Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default NavBar;
