import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { redux } from './reduxStore/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>

    <Provider store={redux}>
      <App />
    </Provider>

  </React.StrictMode>
);


