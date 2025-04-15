import React from 'react';
import { Box, Container, Typography, Grid, Link, IconButton } from '@mui/material';
import { LinkedIn, Twitter, GitHub, Language } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        backgroundColor: '#1a2027',
        color: 'white'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Ulusal İnovasyon için Açık Kaynak HPC
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
              Açık kaynak Yüksek Performanslı Hesaplama (HPC) teknolojilerinin ulusal inovasyon ve savunma sektöründe kullanımını teşvik etmek için oluşturulmuş bir girişim.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="LinkedIn" component="a" href="#" target="_blank">
                <LinkedIn />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter" component="a" href="#" target="_blank">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" aria-label="GitHub" component="a" href="#" target="_blank">
                <GitHub />
              </IconButton>
              <IconButton color="inherit" aria-label="Website" component="a" href="#" target="_blank">
                <Language />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Hızlı Bağlantılar
            </Typography>
            <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="#home" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
                  Ana Sayfa
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="#about" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
                  Proje Hakkında
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="#workshop" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
                  Çalıştay
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="#benefits" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
                  Faydalar
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="#resources" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
                  Kaynaklar
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              İletişim
            </Typography>
            <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Email: info@peakops.com
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Telefon: +90 212 XXX XX XX
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Adres: İstanbul, Türkiye
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center'
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {currentYear} Ulusal İnovasyon için Açık Kaynak HPC. Tüm hakları saklıdır.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
