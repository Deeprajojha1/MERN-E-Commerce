import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AppState from './Context/AppState.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <AppState>
    <App />
  </AppState>,
)
