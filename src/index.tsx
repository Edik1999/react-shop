import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import {BrowserRouter} from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCkGk65zNBdpagu52sOa887fjNYbdEeDgk",
    authDomain: "react-shoppp.firebaseapp.com",
    projectId: "react-shoppp",
    storageBucket: "react-shoppp.appspot.com",
    messagingSenderId: "1059732689195",
    appId: "1:1059732689195:web:5707f4d9fe9130ad08b56e",
    measurementId: "G-2ZP5WE5XGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
        <Auth0Provider
            domain="dev-jccez2ssxsrd8aa6.eu.auth0.com"
            clientId="sxtDyoRC2o0gnC7OuICEFtDjPR1pDNeH"
            authorizationParams={{
                redirect_uri: window.location.origin
            }}
        >
            <App />
        </Auth0Provider>
    </BrowserRouter>
  </Provider>
);