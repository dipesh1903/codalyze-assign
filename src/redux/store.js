import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';

export let store = null;

export function getStore() {

    const composeEnhancers = process.env.NODE_ENV === 'development'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

    store = createStore(require('./rootReducer').default, applyMiddleware(thunk));
    return store;
}
