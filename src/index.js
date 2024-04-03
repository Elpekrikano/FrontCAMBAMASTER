import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot desde 'react-dom/client'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

// Usa createRoot desde 'react-dom/client' en lugar de ReactDOM.render
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Si deseas comenzar a medir el rendimiento de tu aplicación, puedes utilizar reportWebVitals
reportWebVitals();
