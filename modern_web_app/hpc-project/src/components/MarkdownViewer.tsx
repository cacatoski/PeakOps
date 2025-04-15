import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Paper, CircularProgress, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import { useLocation, useNavigate } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css/github-markdown.css';
import mermaid from 'mermaid';

const MarkdownViewer: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      fontSize: 16,
      gantt: {
        titleTopMargin: 25,
        barHeight: 20,
        barGap: 4,
        topPadding: 50,
        leftPadding: 75,
        gridLineStartPadding: 35
      }
    });
  }, []);

  useEffect(() => {
    if (content) {
      setTimeout(() => {
        try {
          mermaid.run();
        } catch (error) {
          console.error('Mermaid diagram rendering error:', error);
        }
      }, 100);
    }
  }, [content]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await fetch(location.pathname.replace(/\.html$/, '') + '.md');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const content = await response.text();
        setContent(content);
        // Sayfa yüklendiğinde en üste scroll yap
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error fetching markdown content:', error);
        setError('Dosya yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [location.pathname]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" color="error" gutterBottom>
              Hata
            </Typography>
            <Typography color="text.secondary">
              {error}
            </Typography>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{
        py: 4,
        backgroundColor: '#f6f8fa',
        minHeight: 'calc(100vh - 64px)',
        mt: '64px'
      }}>
        <Container maxWidth="lg">
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            mb: 3
          }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              variant="contained"
              sx={{
                backgroundColor: '#0366d6',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#0255b3'
                }
              }}
            >
              Geri Dön
            </Button>
          </Box>
          <Paper sx={{
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 2,
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            overflow: 'hidden'
          }}>
            <div className="markdown-body" style={{
              padding: 0,
              fontSize: '16px',
              lineHeight: 1.6
            }}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code: ({ node, className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  if (match && match[1] === 'mermaid') {
                    return (
                      <div className="mermaid" style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        margin: '20px 0',
                        overflow: 'auto'
                      }}>
                        {String(children).replace(/\n$/, '')}
                      </div>
                    );
                  }
                  return (match && match[1]) ? (
                    <pre className={`hljs ${match[1]}`}>
                      <code className={`language-${match[1]}`} {...props}>
                        {children}
                      </code>
                    </pre>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </Paper>
      </Container>
    </Box>
    </>
  );
};

export default MarkdownViewer;
