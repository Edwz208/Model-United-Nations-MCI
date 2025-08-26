import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useStore from './store/store.js'

const queryClient = new QueryClient()

const isLogged = JSON.parse(localStorage.getItem("Logged")) //must parse or else it will be falsy string 
useStore.getState().setLogged(isLogged)
console.log(isLogged, "from main.jsx")
createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>,
  {/* </StrictMode>, */}
)
