import React from 'react'
import { useNavigate } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
//auth0
import { Auth0Provider } from '@auth0/auth0-react'


const domain = import.meta.env.VITE_AUTH0_DOMAIN; // Para Vite
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID; // Para Vite



const onRedirectCallback = (appState) => {
  // const navigate = useNavigate();
  // // navigate(appState?.returnTo || '/home');
  // navigate("/home");
};


const providerConfig = {
  domain: domain,
  clientId: clientId,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: "https://gestion-espacios/api",//"https://dev-zgzo7qc6w6kujif0.us.auth0.com",
  },
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      {...providerConfig}
      // domain={domain}
      // clientId={clientId}
      // redirectUri={window.location.origin}
      // onRedirectCallback={onRedirectCallback}
    >
      <App />

    </Auth0Provider>
  </React.StrictMode>,
)
