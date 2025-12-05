import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useStore from './contexts/store.js'

const queryClient = new QueryClient()

const isLogged = localStorage.getItem("Logged")
useStore.getState().setLogged(isLogged)

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </QueryClientProvider>,
  {/* </StrictMode>, */}
)
