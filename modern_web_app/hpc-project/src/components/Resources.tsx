import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Grid, Tabs, Tab, Button, Card, CardContent, CardActions, Chip } from '@mui/material';
import { Description as DocIcon, Build as ManageIcon, Download as DownloadIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { resourcesData } from '../data/resourcesData';

interface ResourceCardProps {
  title: string;
  description: string;
  path: string;
  category: string;
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
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

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, path, category }) => {
  return (
    <Card
      component={motion.div}
      variants={itemVariants}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)'
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Chip
          label={category === 'management' ? 'Proje Yönetimi' : 'Dokümantasyon'}
          color={category === 'management' ? 'primary' : 'secondary'}
          icon={category === 'management' ? <ManageIcon /> : <DocIcon />}
          size="small"
          sx={{ mb: 2 }}
        />
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          startIcon={<DownloadIcon />}
          component={Link}
          to={path}
          sx={{
            '&:hover': {
              backgroundColor: '#e3f2fd',
            },
          }}
          variant="outlined"
          color="primary"
        >
          İncele
        </Button>
      </CardActions>
    </Card>
  );
};

const Resources: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  return (
    <Box
      id="resources"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: '#f8fafc'
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
                mb: 2
              }}
            >
              Kaynaklar
            </Typography>
            <Typography
              variant="h6"
              component="h3"
              align="center"
              color="text.secondary"
              sx={{ mb: 6 }}
            >
              HPC projeleri için dokümanlar ve araçlar
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Tabs
                value={activeCategory}
                onChange={(e, newValue) => setActiveCategory(newValue)}
                centered
                sx={{ mb: 4 }}
              >
                <Tab
                  label="Tümü"
                  value="all"
                  icon={<DocIcon />}
                  iconPosition="start"
                />
                <Tab
                  label="Proje Yönetimi"
                  value="management"
                  icon={<ManageIcon />}
                  iconPosition="start"
                />
                <Tab
                  label="Dokümantasyon"
                  value="documentation"
                  icon={<DocIcon />}
                  iconPosition="start"
                />
              </Tabs>
            </Box>

            {resourcesData.map((section, index) => (
              <Box key={index} sx={{ mb: 8 }}>
                <Typography
                  variant="h4"
                  component="h3"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    mb: 3
                  }}
                >
                  {section.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 4 }}
                >
                  {section.description}
                </Typography>
                <Grid container spacing={3}>
                  {section.documents
                    .filter(doc => activeCategory === 'all' || doc.category === activeCategory)
                    .map((doc, docIndex) => (
                      <Grid item xs={12} sm={6} md={4} key={docIndex}>
                        <ResourceCard
                          title={doc.name}
                          description={doc.description}
                          path={doc.path}
                          category={doc.category}
                        />
                      </Grid>
                    ))}
                </Grid>
              </Box>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Resources;
