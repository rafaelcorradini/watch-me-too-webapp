import React from 'react';
import ReactDOM from 'react-dom';
import { Grommet } from 'grommet';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import { store, persistor } from './store/index.js';

const theme = {
  global: {
    font: {
      family: 'Poppins',
    },
  },
};

ReactDOM.render((
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Grommet theme={theme}>
        <App />
      </Grommet>
    </PersistGate>
  </ReduxProvider>
), document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
