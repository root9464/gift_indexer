import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GlobalProvider } from './components/providers/global.provider';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalProvider />
  </StrictMode>,
);
