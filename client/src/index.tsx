import React from 'react'
import App from './components/App'
import ReactDOM from 'react-dom/client'
import GlobalStyle from './global-style'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
)
