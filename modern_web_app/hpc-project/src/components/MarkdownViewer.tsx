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
    });
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await fetch(`${location.pathname}.html`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let content = await response.text();
        // HTML içeriğinden markdown-body div'ini çıkar
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const markdownBody = doc.querySelector('.markdown-body');
        if (markdownBody) {
          content = markdownBody.innerHTML;
        }
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
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            variant="outlined"
            sx={{ mr: 2 }}
          >
            Geri Dön
          </Button>
          <img src="/logo.png" alt="UHPC Logo" style={{ height: '40px' }} />
        </Box>
        <Paper sx={{ p: 4 }}>
          <div className="markdown-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code: ({ node, className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  if (match && match[1] === 'mermaid') {
                    return (
                      <div className="mermaid">
                        {String(children).replace(/\n$/, '')}
                      </div>
                    );
                  }
                  return (
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
  );
};

export default MarkdownViewer;
