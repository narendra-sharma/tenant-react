import * as React from 'react';
import { App } from '@/app';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './i18n';

import store from './reduxData/store';

const root = createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <React.Suspense>
          <App />
        </React.Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </Provider>
  // </React.StrictMode>
);
