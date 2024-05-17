import { Suspense } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { persistStore } from 'redux-persist';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PersistGate } from 'redux-persist/lib/integration/react';

import App from './app';
import i18n from './i18n';
import store from './store';
// import { store, persistor } from './store';
// ----------------------------------------------------------------------
const persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
    <BrowserRouter>
        <Suspense>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </Suspense>
      </BrowserRouter>

    </PersistGate>
      
    </Provider>
  </HelmetProvider>
);
