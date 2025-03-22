import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Chip, Divider, Avatar } from '@mui/material';
import { Business, School, AccountBalance, Campaign } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { targetAudienceData } from '../data/targetAudienceData';

const TargetAudience: React.FC = () => {
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

  // İkon eşleştirmeleri
  const getIcon = (sectorName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'Savunma Sanayi': <Business fontSize="large" />,
      'Kamu Kurumları': <AccountBalance fontSize="large" />,
      'Araştırma Merkezleri ve Üniversiteler': <School fontSize="large" />
    };
    
    return iconMap[sectorName] || <Business fontSize="large" />;
  };

  // Renk eşleştirmeleri
  const getColor = (index: number) => {
    const colors = ['#1976d2', '#0d47a1', '#303f9f'];
    return colors[index % colors.length];
  };

  return (
    <Box
      id="audience"
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
              {targetAudienceData.title}
            </Typography>
          </motion.div>

          {targetAudienceData.sectors.map((sector, index) => (
            <React.Fragment key={index}>
              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, mt: index > 0 ? 6 : 0 }}>
                  <Avatar sx={{ bgcolor: getColor(index), mr: 2 }}>
                    {getIcon(sector.name)}
                  </Avatar>
                  <Typography variant="h4" component="h3" sx={{ fontWeight: 600 }}>
                    {sector.name}
                  </Typography>
                </Box>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                  {sector.description}
                </Typography>
              </motion.div>

              <Grid container spacing={3} sx={{ mb: 4 }}>
                {sector.organizations.map((org, orgIndex) => (
                  <Grid item xs={12} sm={6} md={4} key={orgIndex}>
                    <motion.div 
                      variants={itemVariants}
                      custom={orgIndex}
                    >
                      <Card
                        elevation={2}
                        sx={{
                          height: '100%',
                          borderRadius: 2,
                          transition: 'transform 0.3s, box-shadow 0.3s',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: 4
                          }
                        }}
                      >
                        <CardContent>
                          <Typography variant="h6" component="h4" gutterBottom sx={{ fontWeight: 600 }}>
                            {org.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {org.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>

              {index < targetAudienceData.sectors.length - 1 && (
                <Divider sx={{ my: 4 }} />
              )}
            </React.Fragment>
          ))}

          <motion.div variants={itemVariants}>
            <Box sx={{ mt: 8, mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ bgcolor: '#f50057', mr: 2 }}>
                  <Campaign fontSize="large" />
                </Avatar>
                <Typography variant="h4" component="h3" sx={{ fontWeight: 600 }}>
                  {targetAudienceData.communicationStrategy.title}
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Hedef kitlemize ulaşmak için çeşitli iletişim kanalları kullanıyoruz:
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={3}>
            {targetAudienceData.communicationStrategy.channels.map((channel, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div variants={itemVariants}>
                  <Card
                    elevation={2}
                    sx={{
                      height: '100%',
                      borderRadius: 2,
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 4
                      }
                    }}
                  >
                    <Chip 
                      label={channel.name} 
                      color="primary" 
                      sx={{ mb: 2, fontWeight: 500 }} 
                    />
                    <Typography variant="body2">
                      {channel.description}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default TargetAudience;
