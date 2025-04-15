import React from 'react';
import { Box, Container, Typography, Grid, TextField, Button, Paper, IconButton, Link } from '@mui/material';
import { Email, Phone, LocationOn, Send as SendIcon, LinkedIn, Twitter, YouTube, GitHub } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { projectData } from '../data/projectData';

const Contact: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: '#fff'
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants}>
            <Typography
              variant="h3"
              component="h2"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 6,
                position: 'relative',
                '&:after': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  bottom: -16,
                  left: '50%',
                  width: 100,
                  height: 4,
                  backgroundColor: 'primary.main',
                  transform: 'translateX(-50%)'
                }
              }}
            >
              İletişim
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
                  Bize Ulaşın
                </Typography>
                <Box sx={{ mb: 4 }}>
                  <form>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Adınız"
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Soyadınız"
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Email"
                          variant="outlined"
                          type="email"
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Kurum"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Mesajınız"
                          variant="outlined"
                          multiline
                          rows={4}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="large"
                          endIcon={<SendIcon />}
                          sx={{ 
                            mt: 2,
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            fontWeight: 600
                          }}
                        >
                          Gönder
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
                  İletişim Bilgileri
                </Typography>
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    borderRadius: 2,
                    height: '100%',
                    backgroundColor: 'rgba(25, 118, 210, 0.05)'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                    <IconButton
                      sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        mr: 2,
                        '&:hover': {
                          backgroundColor: 'primary.dark'
                        }
                      }}
                    >
                      <Email />
                    </IconButton>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Email
                      </Typography>
                      <Typography variant="body1">
                        {projectData.contact.email}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                    <IconButton
                      sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        mr: 2,
                        '&:hover': {
                          backgroundColor: 'primary.dark'
                        }
                      }}
                    >
                      <Phone />
                    </IconButton>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Telefon
                      </Typography>
                      <Typography variant="body1">
                        {projectData.contact.phone}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <IconButton
                      sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        mr: 2,
                        '&:hover': {
                          backgroundColor: 'primary.dark'
                        }
                      }}
                    >
                      <LocationOn />
                    </IconButton>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Adres
                      </Typography>
                      <Typography variant="body1">
                        {projectData.contact.address}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
          
          {/* Sosyal Medya Bağlantıları */}
          <motion.div variants={itemVariants} style={{ marginTop: '3rem', textAlign: 'center' }}>
            <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Bizi Takip Edin
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <IconButton 
                component="a" 
                href={projectData.contact.social.linkedin} 
                target="_blank"
                sx={{
                  backgroundColor: '#0077B5',
                  color: 'white',
                  '&:hover': { backgroundColor: '#005582' }
                }}
              >
                <LinkedIn />
              </IconButton>
              <IconButton 
                component="a" 
                href={projectData.contact.social.github} 
                target="_blank"
                sx={{
                  backgroundColor: '#24292e',
                  color: 'white',
                  '&:hover': { backgroundColor: '#1a1e22' }
                }}
              >
                <GitHub />
              </IconButton>
              <IconButton 
                component="a" 
                href={projectData.contact.social.twitter} 
                target="_blank"
                sx={{
                  backgroundColor: '#1DA1F2',
                  color: 'white',
                  '&:hover': { backgroundColor: '#0c85d0' }
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton 
                component="a" 
                href={projectData.contact.social.youtube} 
                target="_blank"
                sx={{
                  backgroundColor: '#FF0000',
                  color: 'white',
                  '&:hover': { backgroundColor: '#cc0000' }
                }}
              >
                <YouTube />
              </IconButton>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Contact;
