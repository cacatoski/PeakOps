import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardHeader, Avatar } from '@mui/material';
import { Security, AccountBalance, Speed, Psychology, CloudDone, Code } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { benefitsData } from '../data/benefitsData';

const Benefits: React.FC = () => {
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
  const getIcon = (title: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'Teknolojik Bağımsızlık': <Security fontSize="large" />,
      'Veri Egemenliği': <CloudDone fontSize="large" />,
      'Maliyet Etkinliği': <AccountBalance fontSize="large" />,
      'Toplam Sahip Olma Maliyeti (TCO)': <AccountBalance fontSize="large" />,
      'Esneklik ve Özelleştirilebilirlik': <Code fontSize="large" />,
      'Performans Optimizasyonu': <Speed fontSize="large" />
    };
    
    return iconMap[title] || <Psychology fontSize="large" />;
  };

  // Renk eşleştirmeleri
  const getColor = (index: number) => {
    const colors = ['#1976d2', '#2196f3', '#0d47a1', '#1565c0', '#0288d1', '#0097a7'];
    return colors[index % colors.length];
  };

  return (
    <Box
      id="benefits"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: '#f5f5f5'
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
              {benefitsData.title}
            </Typography>
          </motion.div>

          {/* Stratejik Faydalar */}
          <motion.div variants={itemVariants}>
            <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
              {benefitsData.strategicBenefits.title}
            </Typography>
          </motion.div>

          <Grid container spacing={3} sx={{ mb: 8 }}>
            {benefitsData.strategicBenefits.categories.map((category, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div variants={itemVariants}>
                  <Card 
                    elevation={3}
                    sx={{ 
                      height: '100%',
                      borderRadius: 2,
                      overflow: 'hidden',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6
                      }
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: getColor(index) }}>
                          {getIcon(category.title)}
                        </Avatar>
                      }
                      title={
                        <Typography variant="h6" component="h4" sx={{ fontWeight: 600 }}>
                          {category.title}
                        </Typography>
                      }
                      sx={{ 
                        backgroundColor: 'rgba(25, 118, 210, 0.05)',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
                      }}
                    />
                    <CardContent>
                      {category.items.map((item, itemIndex) => (
                        <Box key={itemIndex} sx={{ mb: 2 }}>
                          <Typography variant="subtitle1" component="h5" sx={{ fontWeight: 600 }}>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.description}
                          </Typography>
                        </Box>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Ekonomik Faydalar */}
          <motion.div variants={itemVariants}>
            <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
              {benefitsData.economicBenefits.title}
            </Typography>
          </motion.div>

          <Grid container spacing={3} sx={{ mb: 8 }}>
            {benefitsData.economicBenefits.categories.map((category, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div variants={itemVariants}>
                  <Card 
                    elevation={3}
                    sx={{ 
                      height: '100%',
                      borderRadius: 2,
                      overflow: 'hidden',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6
                      }
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: getColor(index + 2) }}>
                          {getIcon(category.title)}
                        </Avatar>
                      }
                      title={
                        <Typography variant="h6" component="h4" sx={{ fontWeight: 600 }}>
                          {category.title}
                        </Typography>
                      }
                      sx={{ 
                        backgroundColor: 'rgba(25, 118, 210, 0.05)',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
                      }}
                    />
                    <CardContent>
                      {category.items.map((item, itemIndex) => (
                        <Box key={itemIndex} sx={{ mb: 2 }}>
                          <Typography variant="subtitle1" component="h5" sx={{ fontWeight: 600 }}>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.description}
                          </Typography>
                        </Box>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Teknik Faydalar */}
          <motion.div variants={itemVariants}>
            <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
              {benefitsData.technicalBenefits.title}
            </Typography>
          </motion.div>

          <Grid container spacing={3}>
            {benefitsData.technicalBenefits.categories.map((category, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div variants={itemVariants}>
                  <Card 
                    elevation={3}
                    sx={{ 
                      height: '100%',
                      borderRadius: 2,
                      overflow: 'hidden',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6
                      }
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: getColor(index + 4) }}>
                          {getIcon(category.title)}
                        </Avatar>
                      }
                      title={
                        <Typography variant="h6" component="h4" sx={{ fontWeight: 600 }}>
                          {category.title}
                        </Typography>
                      }
                      sx={{ 
                        backgroundColor: 'rgba(25, 118, 210, 0.05)',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
                      }}
                    />
                    <CardContent>
                      {category.items.map((item, itemIndex) => (
                        <Box key={itemIndex} sx={{ mb: 2 }}>
                          <Typography variant="subtitle1" component="h5" sx={{ fontWeight: 600 }}>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.description}
                          </Typography>
                        </Box>
                      ))}
                    </CardContent>
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

export default Benefits;
