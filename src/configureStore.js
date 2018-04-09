import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducers'
import { loadState, saveState } from './localStorage'


const configureStore = () => {
    const middleware = [thunk];

    if (process.env.NODE_ENV !== 'production') {
        middleware.push(createLogger());
    }

    const composeEnhancers = compose(
        applyMiddleware(...middleware),
        // window.devToolsExtension && window.devToolsExtension()
    )

    const persistedState = loadState();
    const store = createStore(
        reducer,
        composeEnhancers
    );
    return store;
}

export default configureStore;