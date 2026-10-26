import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'leaflet/dist/leaflet.css'
import './index.css'
import App from './App.tsx'

// With skipWaiting + clientsClaim, a new service worker takes control of
// this tab automatically on the next update check - but taking control
// doesn't by itself reload the page, so an already-open tab would keep
// running the old JS/CSS bundle indefinitely without this. Reload once,
// exactly when control actually changes hands.
if ('serviceWorker' in navigator) {
  let reloaded = false
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloaded) return
    reloaded = true
    window.location.reload()
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
