import React from 'react';
import ReactDOM from 'react-dom';
import { Grommet } from 'grommet';
import { Provider as ReduxProvider } from 'react-redux';

import App from './App.jsx';
import { store } from './storage/index.js';

const theme = {
  global: {
    font: {
      family: 'Poppins',
    },
  },
};

ReactDOM.render((
  <ReduxProvider store={store}>
    <Grommet theme={theme}>
      <App />
    </Grommet>
  </ReduxProvider>
), document.getElementById('app'));
