import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Provider } from 'react-redux';
import { store } from './store';
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import common_vi from './shared/translations/vi/common.json'

i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: 'vi',   
  resources: {
    vi: {
      common: common_vi
    }
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});
root.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      <App/>
    </I18nextProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
