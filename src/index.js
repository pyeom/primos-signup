import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

// MSAL shit
import {PublicClientApplication, EventType} from '@azure/msal-browser'
import {msalConfig, loginRequest} from './authConfig'

export const msalInstance = new PublicClientApplication(msalConfig)

// Activar la cuenta si hay alguna ya registrada cuando se inicia la página
const accounts = msalInstance.getAllAccounts()
if (accounts.length > 0) {
  if (accounts.length > 1) console.warn(`Hay ${accounts.length} cuentas logeadas`)
  if (msalInstance.getActiveAccount() == null) {
    console.log(`Ninguna cuenta activa, iniciando sesión con ${accounts[0]}`)
    msalInstance.setActiveAccount(accounts[0])
  }
}

msalInstance.addEventCallback(event => {
  // Activar la cuenta cuando se logee
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    const account = event.payload.account
    msalInstance.setActiveAccount(account)
  }
  // Solicitar logeo cuando cierras la cuenta
  else if (
    event.eventType === EventType.HANDLE_REDIRECT_END &&
    msalInstance.getActiveAccount() == null
  )
    msalInstance.loginRedirect(loginRequest)
})
// END of MSAL shit

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App pca={msalInstance} />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
