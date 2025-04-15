import React from 'react';
import { Box, Container, Typography, Button, Grid, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';

// HPC görselleri için sabit değişkenler
const HPC_BACKGROUND = '/images/hpc-workshop.jpg';
const HPC_OVERLAY_PATTERN = 'data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E';

const Hero: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      id="home"
      sx={{
        position: 'relative',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${HPC_BACKGROUND})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4)',
          zIndex: 0,
          transition: 'all 0.3s ease-in-out',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 100%)`,
          zIndex: 0,
          transition: 'all 0.3s ease-in-out',
        }
      }}
    >
      {/* Animasyonlu gradient overlay */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1.5 }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}80 0%, ${theme.palette.secondary.main}80 100%)`,
        }}
      />
      
      {/* Animasyonlu grid pattern */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
          backgroundImage: `url("${HPC_OVERLAY_PATTERN}")`,
          backgroundSize: '40px 40px',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3, py: { xs: 8, md: 12 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography 
                variant="h1"
                sx={{ 
                  fontWeight: 800,
                  mb: 3,
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2
                }}
              >
                Ulusal İnovasyon için Açık Kaynak HPC
              </Typography>
              
              <Typography 
                variant="h4"
                sx={{ 
                  mb: 4,
                  opacity: 0.9,
                  fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
                  fontWeight: 400,
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: 1.6,
                  maxWidth: '90%'
                }}
              >
                Açık kaynak Yüksek Performanslı Hesaplama (HPC) teknolojilerinin ulusal inovasyon ve savunma sektöründe kullanımını teşvik etmek için oluşturulmuş bir girişim.
              </Typography>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <Box sx={{ display: 'flex', gap: 3, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
                  <Button 
                    variant="contained" 
                    color="secondary"
                    size="large"
                    sx={{ 
                      py: 2,
                      px: 4,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.primary.dark} 100%)`,
                        transform: 'translateY(-2px)',
                        transition: 'all 0.3s ease-in-out'
                      }
                    }}
                  >
                    <ScrollLink
                      to="workshop"
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      Çalıştaya Katıl
                    </ScrollLink>
                  </Button>
                  
                  <Button 
                    variant="outlined"
                    size="large"
                    sx={{ 
                      py: 2,
                      px: 4,
                      fontSize: '1.1rem',
                      fontWeight: 500,
                      color: 'white',
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      }
                  }}
                >
                  <ScrollLink
                    to="about"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                  >
                    Daha Fazla Bilgi
                  </ScrollLink>
                </Button>
              </Box>
              </motion.div>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                width: '100%',
                height: '100%',
                minHeight: isMobile ? '300px' : '500px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    right: '10%',
                    bottom: '10%',
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}40 0%, ${theme.palette.secondary.main}40 100%)`,
                    filter: 'blur(40px)',
                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                    animation: 'morphing 15s ease-in-out infinite',
                  },
                  '@keyframes morphing': {
                    '0%': {
                      borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'
                    },
                    '50%': {
                      borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%'
                    },
                    '100%': {
                      borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'
                    }
                  }
                }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
