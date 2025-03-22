import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Paper, Divider, Chip, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { Event as EventIcon, AccessTime as TimeIcon, LocationOn as LocationIcon, Close as CloseIcon, HowToReg as RegisterIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { workshopData } from '../data/workshopData';

const Workshop: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      id="workshop"
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
              HPC Çalıştayı
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card 
              elevation={4}
              sx={{ 
                mb: 6, 
                borderRadius: 2,
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  height: 8, 
                  backgroundColor: 'primary.main' 
                }} 
              />
              <CardContent sx={{ p: 4, pt: 5 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <EventIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="body1" fontWeight={500}>
                        {workshopData.eventInfo.date}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <TimeIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="body1" fontWeight={500}>
                        {workshopData.eventInfo.time}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LocationIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="body1" fontWeight={500}>
                        {workshopData.eventInfo.location}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                  <Chip 
                    label={workshopData.eventInfo.format} 
                    color="secondary" 
                    size="medium" 
                    sx={{ fontWeight: 500 }} 
                  />
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
              Çalıştay Programı
            </Typography>
          </motion.div>

          <Grid container spacing={3}>
            {workshopData.schedule.map((session, index) => (
              <Grid item xs={12} key={index}>
                <motion.div 
                  variants={itemVariants}
                  custom={index}
                >
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: 4
                      }
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={3}>
                        <Typography 
                          variant="subtitle1" 
                          sx={{ 
                            fontWeight: 600, 
                            color: 'primary.main',
                            backgroundColor: 'rgba(25, 118, 210, 0.1)',
                            p: 1,
                            borderRadius: 1,
                            display: 'inline-block'
                          }}
                        >
                          {session.time}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                          {session.title}
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                          {session.items.map((item, itemIndex) => (
                            <Typography 
                              component="li" 
                              variant="body2" 
                              key={itemIndex}
                              sx={{ mb: 0.5 }}
                            >
                              {item}
                            </Typography>
                          ))}
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <motion.div variants={itemVariants}>
            <Box sx={{ mt: 6 }}>
              <Divider sx={{ mb: 4 }} />
              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                Katılımcılara Sağlanacak Materyaller
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                {workshopData.materials.map((material, index) => (
                  <Chip 
                    key={index} 
                    label={material} 
                    variant="outlined" 
                    sx={{ mb: 1 }} 
                  />
                ))}
              </Box>
            </Box>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <Divider sx={{ mb: 4 }} />
              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                HPC Çalıştayı Kayıt
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                HPC Çalıştayına katılmak için aşağıdaki butona tıklayarak kayıt formunu doldurabilirsiniz.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleClickOpen} 
                startIcon={<RegisterIcon />}
                size="large"
                sx={{ 
                  mt: 2,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600
                }}
              >
                Başvuru İçin Tıklayın
              </Button>
            </Box>
          </motion.div>

          <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              <Typography variant="h6">HPC Çalıştayı Kayıt Formu</Typography>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ height: '80vh', width: '100%', overflow: 'hidden' }}>
                <iframe 
                  src="https://form.jotform.com/your-jotform-id" 
                  title="HPC Çalıştayı Kayıt Formu"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    border: 'none',
                    overflow: 'hidden'
                  }}
                />
              </Box>
            </DialogContent>
          </Dialog>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Workshop;
