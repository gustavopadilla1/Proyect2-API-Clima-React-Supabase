import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";

import i18n from "./config/localization/i18n";
import { I18nextProvider } from "react-i18next";


 
ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
  <BrowserRouter>
 <App />
 </BrowserRouter>  
 </I18nextProvider>
</React.StrictMode>,
document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
