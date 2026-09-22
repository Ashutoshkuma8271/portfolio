import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import { OfficeAuthProvider } from './contexts/OfficeAuthContext';
// Fonts are bundled with the site (no request to Google at load time).
// Cinzel -> H1/H2 display. Plus Jakarta Sans -> every other heading, body and label.
// Cormorant Garamond italic -> the gold accent phrase inside a heading.
import '@fontsource/cinzel/600.css';
import '@fontsource/cinzel/700.css';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/400-italic.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/500-italic.css';
import '@fontsource/cormorant-garamond/600-italic.css';
import '@fontsource/cormorant-garamond/700-italic.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <OfficeAuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </OfficeAuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
