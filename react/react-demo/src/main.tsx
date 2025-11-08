import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css' // Importar estilos (con Bootstrap)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Envolvemos la App con el Router */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)