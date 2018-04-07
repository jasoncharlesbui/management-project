import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducers'

const configureStore = () => {
    const middleware = [thunk];

    if (process.env.NODE_ENV !== 'production') {
        middleware.push(createLogger());
    }

    const composeEnhancers = compose(
        applyMiddleware(...middleware),
        // window.devToolsExtension && window.devToolsExtension()
    )

    return createStore(
        reducer,
        composeEnhancers
    )
}

export default configureStore;