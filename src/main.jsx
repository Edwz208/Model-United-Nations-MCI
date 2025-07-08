import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './globals.css'
import { AuthProvider } from './context/AuthProvider';
import {ResolutionProvider} from './context/ResProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ResolutionProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ResolutionProvider>
  </StrictMode>,
)
