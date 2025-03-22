import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, Container, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import peakOpsLogo from '../assets/peakops-logo.svg';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { id: 'home', name: 'Ana Sayfa' },
    { id: 'about', name: 'Hakkında' },
    { id: 'workshop', name: 'Çalıştay' },
    { id: 'benefits', name: 'Faydalar' },
    { id: 'audience', name: 'Hedef Kitle' },
    { id: 'resources', name: 'Kaynaklar' },
    { id: 'contact', name: 'İletişim' },
  ];

  // Drawer açma/kapama işleyicisi
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  // Animasyon varyantları
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const logoVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  return (
    <AppBar
      position="fixed"
      elevation={isScrolled ? 4 : 0}
      sx={{
        backgroundColor: isScrolled ? 'white' : 'transparent',
        boxShadow: isScrolled
          ? '0px 2px 4px rgba(0, 0, 0, 0.1)'
          : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <motion.div
            initial="initial"
            whileHover="hover"
            variants={logoVariants}
            style={{ flexGrow: 0 }}
          >
            <Box
              component="img"
              src={peakOpsLogo}
              alt="PeakOps Logo"
              sx={{
                height: 40,
                mr: 2,
                filter: isScrolled ? 'none' : 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))',
              }}
            />
          </motion.div>

          <Box sx={{ flexGrow: 1 }} />

          {isMobile ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{
                  color: isScrolled ? 'primary.main' : 'white',
                }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                >
                  <List>
                    {navItems.map((item) => (
                      <ListItem key={item.id} disablePadding>
                        <ListItemButton>
                          <ScrollLink
                            to={item.id}
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            onClick={() => setDrawerOpen(false)}
                          >
                            <ListItemText primary={item.name} />
                          </ScrollLink>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={navVariants}
            >
              <Box sx={{ display: 'flex' }}>
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    sx={{
                      mx: 1,
                      color: isScrolled ? 'text.primary' : 'white',
                      '&:hover': {
                        backgroundColor: isScrolled
                          ? 'rgba(25, 118, 210, 0.04)'
                          : 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    <ScrollLink
                      to={item.id}
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                    >
                      {item.name}
                    </ScrollLink>
                  </Button>
                ))}
              </Box>
            </motion.div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
