import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from 'react-moralis';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <MoralisProvider appId="APIGMJIPstgVHlwjHfTRCx0wlVJ7fxKpGCQzmccY" serverUrl="https://trkuhtooj0nk.usemoralis.com:2053/server">
    <App />
    </MoralisProvider>
  </React.StrictMode>
);


reportWebVitals();
