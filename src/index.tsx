import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import {BrowserRouter} from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
        <Auth0Provider
            domain="react-shop-test-auth.eu.auth0.com"
            clientId="JcylG0svGWHEhg7O4cFNCweZPrVhlWnD"
            authorizationParams={{
                redirect_uri: "http://localhost:3000/menu"
            }}
        >
            <App />
        </Auth0Provider>
    </BrowserRouter>
  </Provider>
);