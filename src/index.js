import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';


import App from './pages/App/App.js';

import { Provider } from 'react-redux'
import configureStore from './configureStore'

ReactDOM.render(
    <Provider
        store={configureStore()}
    >
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();