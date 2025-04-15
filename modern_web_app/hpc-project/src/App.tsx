import React, { useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Bileşenler
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Workshop from './components/Workshop';
import Benefits from './components/Benefits';
import TargetAudience from './components/TargetAudience';
import Resources from './components/Resources';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MarkdownViewer from './components/MarkdownViewer';

// Tema ayarları
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb', // Modern mavi
      light: '#60a5fa',
      dark: '#1e40af',
    },
    secondary: {
      main: '#7c3aed', // Modern mor
      light: '#a78bfa',
      dark: '#5b21b6',
    },
    background: {
      default: '#ffffff',
      paper: '#f8fafc',
    },
    success: {
      main: '#059669', // Modern yeşil
    },
    error: {
      main: '#dc2626', // Modern kırmızı
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "system-ui", "-apple-system", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 24px',
          fontWeight: 500,
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

const HomePage: React.FC = () => (
  <>
    <Hero />
    <About />
    <Workshop />
    <Benefits />
    <TargetAudience />
    <Resources />
    <Contact />
  </>
);

function App() {
  useEffect(() => {
    // AOS (Animate On Scroll) kütüphanesini başlat
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/documentation/*" element={<MarkdownViewer />} />
            <Route path="/project_management/*" element={<MarkdownViewer />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
